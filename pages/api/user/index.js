import prisma from "../../../db/prisma.ts";

export default async function handler(req, res) {
	if (req.method.toUpperCase() === "POST") {
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
