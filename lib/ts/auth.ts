import { UserMetadata, User } from "firebase/auth";
import { UserModel } from "./models";

export const databaseUserFormat = <T extends User, U extends Partial<UserModel>>(
	u: T,
	existing?: U
): Partial<UserModel> => {
	const user: User = u;
	const name = user.displayName.split(" ");
	const metadata: UserMetadata = u.metadata;

	const formattedUser: Partial<UserModel> = {
		fid: user.uid,
		profile: {
			email: existing
				? existing.profile.email.concat([
						{ address: user.email, verified: user.emailVerified, primary: false },
				  ])
				: [{ address: user.email, verified: user.emailVerified, primary: true }],
			name: {
				first: name?.[0] ?? "",
				last: name?.[1] ?? "",
				display: user.displayName,
			},
			photo: user.photoURL,
			phone: user.phoneNumber,
		},
		meta: {
			created:
				existing?.meta?.created &&
				new Date(existing?.meta?.created) < new Date(metadata.creationTime)
					? existing?.meta?.created
					: metadata.creationTime,
			lastLogin: metadata.lastSignInTime,
		},
	};

	if (existing) {
		formattedUser.id = existing.id;
	}
	
	return formattedUser;
};
