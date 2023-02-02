import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
	if (req.method.toUpperCase() === "POST") {
		if (!req.body?.id || !req.body?.profile || !req.body?.auth) {
			res.status(422).json({ message: "Invalid Data" });
			return;
		}

		await prisma.$connect().catch((error) => {
			res.status(500).json({ error });
			return;
		});

		return await prisma.user
			.create({
				data: req.body,
				include: {
					projects: true,
				},
			})
			.then((result) => {
				res.status(201).json({ message: "User Created!", data: { user: result } });
				return;
			})
			.catch((error) => {
				res.status(500).json({ message: "Database Error", error });
				return;
			})
			.finally(async () => {
				await prisma.$disconnect();
				return;
			});
	} else {
		res.status(405).json({ message: "Invalid Request" });
		return;
	}
}
