export async function getUserFromDatabase(uid) {
	if (!uid) throw new Error("ID required");

	const databaseUser = await fetch(`/api/user/${uid}`)
		.then((r) => r.json())
		.catch((err) => err);

	return databaseUser;
}

export async function createDatabaseUser(user, credential) {
	const data = {
		uid: user.uid,
		profile: {
			uid: user.uid,
			email: user.email,
			name: user.displayName,
			photo: user.photoURL,
		},
		providers: user.providerData,
		meta: {
			created: user.metadata.createdAt,
			createdReadable: user.metadata.creationTime,
			lastLogin: user.metadata.lastLoginAt,
			lastLoginReadable: user.metadata.lastSignInTime,
		},
		credentials: credential,
	};

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

export async function updateDatabaseUser(user, credential) {
	const data = {
		uid: user.uid,
		profile: {
			uid: user.uid,
			email: user.email,
			name: user.displayName,
			photo: user.photoURL,
		},
		providers: user.providerData,
		meta: {
			created: user.metadata.createdAt,
			createdReadable: user.metadata.creationTime,
			lastLogin: user.metadata.lastLoginAt,
			lastLoginReadable: user.metadata.lastSignInTime,
		},
		credentials: credential,
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

export async function deleteDatabaseUser(uid) {
	const response = await fetch(`/api/user/${uid}`, {
		method: "delete",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((r) => r.json())
		.catch((err) => err);

	return response;
}
