import {
	getAuth,
	signInWithPopup,
	signInWithCredential,
	GoogleAuthProvider,
	GithubAuthProvider,
	linkWithPopup,
	linkWithCredential,
	signOut,
	deleteUser,
	onAuthStateChanged,
	unlink,
	OAuthCredential,
	User,
	OAuthProvider,
} from "firebase/auth";
import { databaseUserFormat } from "../lib/ts/auth";
import { UserModel } from "../lib/ts/models";
import {
	getUserFromDatabase,
	saveDatabaseUser,
	createDatabaseUser,
	updateDatabaseUser,
	deleteDatabaseUser,
} from "../lib/user";
import { app, auth } from "./firebase";

// const providers = {
// 	"google.com": {
// 		provider: GoogleAuthProvider,
// 		credential: (cred: OAuthCredential) =>
// 			GoogleAuthProvider.credential(cred.idToken, cred.accessToken),
// 	},
// 	"github.com": {
// 		provider: GithubAuthProvider,
// 		credential: (cred: OAuthCredential) => GithubAuthProvider.credential(cred.accessToken),
// 	},
// };

// interface Provider {
// 	[provider: string]: {
// 		provider: OAuthProvider,
// 		credential: (cred: OAuthCredential):
// 	}
// }

const providers = {
	"google.com": {
		provider: GoogleAuthProvider,
		credential: function (cred: OAuthCredential) {
			return this.provider.credential(cred.idToken, cred.accessToken);
		},
	},
	"github.com": {
		provider: GithubAuthProvider,
		credential: function (cred: OAuthCredential) {
			return this.provider.credential(cred.accessToken);
		},
	},
};

function getCurrentUser() {
	const auth = getAuth(app);
	return auth.currentUser;
}

async function linkProviderAccount(prvd) {
	const provider = providers[prvd].provider;
	const currentUser = getCurrentUser();
	let prevUser = currentUser;
	let updated;

	const result = await linkWithPopup(currentUser, new provider())
		.then((result) => {
			const credential = provider.credentialFromResult(result);
			const user = result.user;

			return { credential, user };
		})
		.catch((error) => error);

	if (!result?.user) {
		let error = result;

		if (error?.code === "auth/credential-already-in-use") {
			let credential = provider.credentialFromError(error);
			return await linkExistingAccount(credential, provider, prevUser);
		}
	} else {
		updated = await updateDatabaseUser(result.user, [result.credential]);
	}

	return { ...result, databaseUser: updated };
}

async function linkExistingAccount(cred, provider, prevUser) {
	const auth = getAuth(app);
	let prevDbUser = await getUserFromDatabase(prevUser.uid, "fid");
	let prevProvider = providers[prevUser.providerData[0].providerId].provider;
	let prevCredentials = providers[prevUser.providerData[0].providerId].credential(
		prevDbUser.data?.user?.credentials?.[0]
	);

	let result = await signInWithCredential(auth, cred)
		.then((result) => result)
		.catch((error) => error);

	if (result?.user) {
		const currentUser = result.user;
		const mergedUser = { ...prevUser };
		let linkedDbUser;

		const credential = provider.credentialFromResult(result);

		if (currentUser) {
			mergedUser.providerData.push(currentUser.providerData[0]);
			const dbUser = await getUserFromDatabase(currentUser.uid, "fid");
			await deleteDatabaseUser(dbUser.id);
			// await deleteDatabaseUser(currentUser.uid);
		}

		await deleteUser(auth.currentUser);

		let linkedUser = await signInWithCredential(auth, prevCredentials)
			.then((result) => result)
			.catch((error) => error);

		if (linkedUser?.user) {
			let linked = await linkWithCredential(linkedUser?.user, credential)
				.then((linkResult) => {
					const linkCredential = prevProvider.credentialFromResult(linkResult);
					return { ...linkResult, credential: linkCredential };
				})
				.catch((err) => ({ ...err, credential: prevProvider.credentialFromError(err) }));

			if (linked?.user) {
				const existingDbUser = await getUserFromDatabase(mergedUser?.uid, "fid");
				const formattedUser: Partial<UserModel> = databaseUserFormat(
					mergedUser,
					existingDbUser
				);
				linkedDbUser = await saveDatabaseUser(formattedUser);
				// linkedDbUser = await updateDatabaseUser(mergedUser, [linked.credential]);
			}
		}

		return { ...linkedUser, databaseUser: linkedDbUser };
	}
}

async function unlinkAccount(providerId) {
	const auth = getAuth(app);
	return unlink(auth.currentUser, providerId)
		.then(async () => {
			let dbUser = await getUserFromDatabase(auth.currentUser.uid, "fid")
				.then((res) => res.data.user)
				.catch((err) => err);
			if (dbUser?.uid) {
				await updateDatabaseUser(
					auth.currentUser,
					dbUser.credentials.filter((entry) =>
						auth.currentUser.providerData.some(
							(provider) => provider.providerId === entry.providerId
						)
					)
				);
			}
		})
		.catch((error) => error);
}

export async function signIn(prvd: "google.com" | "github.com") {
	const auth = getAuth(app);
	const provider = providers[prvd].provider;

	const userInfo = await signInWithPopup(auth, new provider())
		.then((result: any) => ({ ...result, credential: provider.credentialFromResult(result) }))
		.catch((error) => ({ error, credential: provider.credentialFromError(error) }));

	let dbUser: any;

	if (userInfo?.user) {
		const user = userInfo.user;

		dbUser = await getUserFromDatabase(user?.uid, "fid");

		if (!dbUser) {
			const formattedUser: Partial<UserModel> = databaseUserFormat(user);
			// dbUser = await createDatabaseUser(user, [userInfo.credential]);
			dbUser = await createDatabaseUser(formattedUser);
		}
	}

	return { ...userInfo, user: dbUser?.data?.user };
}

async function authStateListener(cb) {
	onAuthStateChanged(auth, cb);
}

async function signOutUser() {
	const auth = getAuth(app);

	return signOut(auth)
		.then(() => {})
		.catch((error) => {
			return { error };
		});
}

export { linkProviderAccount, unlinkAccount, authStateListener, signOutUser };
