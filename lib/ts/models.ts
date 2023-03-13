// export interface UserModel {
//     id: string,
//     profile: {
//         email?: string | { address: string, primary?: boolean, verified?: boolean }[],
//         name?: {
//             first?: string;
//             last?: string;
//             diplay?: string;
//         },
//         photo?: string,
//         phone?: string,
//     },
//     auth: {
//         uid: string | string[],
//         providers: string,
//         meta: {
//             created: string,
//             createdReadable: string,
//             lastLogin: string,
//             lastLoginReadable: string,
//         },
//         // credentials: any
//     },
// }

export interface UserModel {
	id: string;
	fid: string;
	profile: {
		email?: { address: string; primary?: boolean; verified?: boolean }[];
		name?: {
			first?: string;
			last?: string;
			display?: string;
		};
		photo?: string;
		phone?: string;
	};
	meta: {
		created: string;
		lastLogin: string;
	};
	projects: [];
	logs: [];
}

export interface ProjectModel {
	id: string;
	ownerId: string;
	owner: UserModel;
	name: string;
	description: string;
	category: string;
	status: string;
	dates: DateItem[];
	type: string;
	role: { title: string; description: string };
	client: { name: string; industry: string; contact: { name: string; phone: number } };
	teamSize: number;
	url: string;
	files: string[];
	tags: string[];
	tools: string[];
	logs: LogModel[];
	created: Date;
	lastUpdated: Date;
}

export interface LogModel {
	id: string;
	projectId: string;
	project: ProjectModel;
	authorId: string;
	author: UserModel;
	title: string;
	message: string;
	type: string;
	dates: DateItem[];
	created: Date;
	lastUpdated: Date;
}

interface DateItem {
	date: Date;
	type: DateTypes;
}

enum DateTypes {
	START,
	END,
	TARGET,
}

// id: user.uid,
// profile: {
//     email: user.email,
//     name: user.displayName,
//     photo: user.photoURL,
// },
// auth: {
//     uid: user.uid,
//     providers: user.providerData,
//     meta: {
//         created: user.metadata.createdAt,
//         createdReadable: user.metadata.creationTime,
//         lastLogin: user.metadata.lastLoginAt,
//         lastLoginReadable: user.metadata.lastSignInTime,
//     },
//     credentials: credential,
// },

//   model User {
//     id       String    @id @map("_id")
//     auth     Auth
//     profile  Profile?
//     projects Project[]
//     logs     Log[]
//     @@map("user")
//   }

//   type Auth {
//     uid         String
//     meta        UserMeta?
//     providers   ProviderData[]
//     credentials Credential[]
//   }

//   type Credential {
//     accessToken  String
//     idToken      String?
//     pendingToken String?
//     providerId   String
//     signInMethod String?
//   }

//   type Profile {
//     email String
//     name  String?
//     photo String?
//     // phone String?
//   }

//   model ProfileModel {
//     id       String  @id @default(auto()) @map("_id") @db.ObjectId
//     uid      String  @unique
//     email    String  @unique
//     name     String?
//     provider String?
//     photo    String?
//   }

//   type ProviderData {
//     displayName String
//     email       String?
//     phoneNumber String?
//     photoURL    String?
//     providerId  String
//     uid         String
//   }

//   model Project {
//     id          String  @id @default(auto()) @map("_id") @db.ObjectId
//     ownerId     String  @unique
//     // ownerId     String  @unique @db.ObjectIdÍ
//     owner       User    @relation(fields: [ownerId], references: [id])
//     name        String
//     description String?
//     category    String?
//     status      String?
//     dates       Date[]

//     type     String?
//     role     Role?
//     client   Client?
//     teamSize Int?
//     // team        User[]
//     url      String?
//     files    String[]
//     tags     String[]
//     tools    String[]

//     logs        Log[]
//     created     DateTime @default(now())
//     lastUpdated DateTime @updatedAt

//     @@unique([id, ownerId])
//     @@map("project")
//   }

//   model Log {
//     id          String   @id @default(auto()) @map("_id") @db.ObjectId
//     projectId   String   @unique @db.ObjectId
//     project     Project  @relation(fields: [projectId, authorId], references: [id, ownerId])
//     // authorId    String   @unique @db.ObjectId
//     authorId    String   @unique
//     author      User     @relation(fields: [authorId], references: [id])
//     title       String?
//     message     String?
//     type        String?
//     dates       Date[]
//     created     DateTime @default(now())
//     lastUpdated DateTime @updatedAt

//     @@map("log")
//   }

//   type Client {
//     name     String
//     industry String?
//     // contact
//   }

//   type Date {
//     date DateTime
//     type DateTypes
//   }

//   enum DateTypes {
//     START
//     END
//     TARGET
//   }

//   enum LogType {
//     DETAIL
//     GOAL
//     TASK
//   }

//   type Role {
//     title       String?
//     description String?
//   }
