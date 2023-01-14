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
} from "firebase/auth";
import { getUserFromDatabase, createDatabaseUser, updateDatabaseUser, deleteDatabaseUser } from "../lib/user";
import { app, auth } from "./firebase";

const providers = {
	"google.com": { provider: GoogleAuthProvider, credential: (cred) => GoogleAuthProvider.credential(cred.idToken, cred.accessToken) },
	"github.com": { provider: GithubAuthProvider, credential: (cred) => GithubAuthProvider.credential(cred.accessToken) },
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
	let prevDbUser = await getUserFromDatabase(prevUser.uid);
	let prevProvider = providers[prevUser.providerData[0].providerId].provider;
	let prevCredentials = providers[prevUser.providerData[0].providerId].credential(prevDbUser.data?.user?.credentials?.[0]);

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
			await deleteDatabaseUser(currentUser.uid);
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

			if (linked?.user) linkedDbUser = await updateDatabaseUser(mergedUser, [linked.credential]);
		}

		return { ...linkedUser, databaseUser: linkedDbUser };
	}
}

async function unlinkAccount(providerId) {
	const auth = getAuth(app);
	return unlink(auth.currentUser, providerId)
		.then(async () => {
			let dbUser = await getUserFromDatabase(auth.currentUser.uid)
				.then((res) => res.data.user)
				.catch((err) => err);
			if (dbUser?.uid) {
				await updateDatabaseUser(
					auth.currentUser,
					dbUser.credentials.filter((entry) => auth.currentUser.providerData.some((provider) => provider.providerId === entry.providerId))
				);
			}
		})
		.catch((error) => error);
}

async function signIn(prvd) {
	const auth = getAuth(app);
	const provider = providers[prvd].provider;

	let userInfo = await signInWithPopup(auth, new provider())
		.then((result) => ({ ...result, credential: provider.credentialFromResult(result) }))
		.catch((error) => ({ error, credential: provider.credentialFromError(error) }));
	let dbUser;

	if (userInfo?.user) {
		const user = userInfo.user;

		dbUser = await getUserFromDatabase(user?.uid);

		if (!dbUser?.data?.user) {
			dbUser = await createDatabaseUser(user, [userInfo.credential]);
		}
	} else {
		document.querySelector(".login-result-title").innerHTML = "Error, Try Agin";
		document.querySelector(".login-result-message").innerHTML = "Something went wrong trying to connect your Google account.";
	}

	return { ...userInfo, databaseUser: dbUser };
}

async function authStateListener(cb) {
	onAuthStateChanged(auth, cb);
}

async function signOutUser() {
	try {
		return await signOut(auth);
	} catch (error) {
		return { error };
	}
}

export { linkProviderAccount, unlinkAccount, authStateListener, signOutUser, signIn };
