import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
	const { uid } = req.query;

	await prisma.$connect().catch((error) => {
		res.status(500).json({ error });
		return;
	});

	if (req.method.toUpperCase() === "GET") {
		await prisma.user
			.findUnique({ where: { uid } })
			.then((result) => {
				res.status(200).json({ message: "Query Completed", data: { user: result } });
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
	} else if (req.method === "PUT") {
		return await prisma.user
			.update({
				where: {
					uid,
				},
				data: req.body,
			})
			.then((result) => {
				res.status(200).json({ message: "Update Successful", data: { user: result } });
				return;
			})
			.catch((error) => {
				res.status(500).json({ message: "Error updating user", error });
				return;
			})
			.finally(async () => {
				await prisma.$disconnect();
				return;
			});
	} else if (req.method.toUpperCase() === "DELETE") {
		await prisma.user
			.delete({
				where: {
					uid,
				},
			})
			.then(() => {
				res.status(200).json({ message: "Delete Successful", data: { uid } });
				return;
			})
			.catch((error) => {
				res.status(500).json({ message: "Database Error", error });
				return;
			})
			.finally(async () => {
				await prisma.$disconnect();
			});
	} else {
		res.status(405).json({ message: "Invalid Request" });
		return;
	}
}
