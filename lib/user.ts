import { UserModel } from "./ts/models";

export async function getUserFromDatabase(uid: string, type?: string) {
	if (!uid) throw new Error("ID required");

	const databaseUser = await fetch(`/api/user/${uid}?type=${type}`)
		.then(async (r) => {
			const data: any = await r.json();

			if (data?.data?.user) {
				return data.data.user;
			}
		})
		.catch((err) => err);

	return databaseUser;
}

export async function createDatabaseUser(user: Partial<UserModel>) {
	const data = user;

	const databaseUser = await fetch(`/api/user`, {
		method: "post",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((r) => r.json())
		.catch((err) => err);

	return databaseUser;
}

export async function saveDatabaseUser(user: Partial<UserModel>) {
	const data = user;

	const databaseUser = await fetch(`/api/user`, {
		method: "post",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((r) => r.json())
		.catch((err) => err);

	return databaseUser;
}

// export async function createDatabaseUser(user, credential) {
// 	const data = {
// 		id: user.uid,
// 		profile: {
// 			email: user.email,
// 			name: user.displayName,
// 			photo: user.photoURL,
// 		},
// 		auth: {
// 			uid: user.uid,
// 			providers: user.providerData,
// 			meta: {
// 				created: user.metadata.createdAt,
// 				createdReadable: user.metadata.creationTime,
// 				lastLogin: user.metadata.lastLoginAt,
// 				lastLoginReadable: user.metadata.lastSignInTime,
// 			},
// 			credentials: credential,
// 		},
// 	};

// 	const databaseUser = await fetch(`/api/user`, {
// 		method: "post",
// 		body: JSON.stringify(data),
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	})
// 		.then((r) => r.json())
// 		.catch((err) => err);

// 	return databaseUser;
// }

export async function updateDatabaseUser(user, credential) {
	const data = {
		id: user.uid,
		profile: {
			email: user.email,
			name: user.displayName,
			photo: user.photoURL,
		},
		auth: {
			uid: user.uid,
			providers: user.providerData,
			meta: {
				created: user.metadata.createdAt,
				createdReadable: user.metadata.creationTime,
				lastLogin: user.metadata.lastLoginAt,
				lastLoginReadable: user.metadata.lastSignInTime,
			},
			credentials: credential,
		},
	};

	const response = await fetch(`/api/user/${user.uid}`, {
		method: "put",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((r) => r.json())
		.catch((err) => err);

	return response;
}

export async function deleteDatabaseUser(id: string) {
	const response = await fetch(`/api/user/${id}`, {
		method: "delete",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((r) => r.json())
		.catch((err) => err);

	return response;
}
