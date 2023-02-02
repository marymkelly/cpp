import prisma from "../../../db/prisma";

export default async function handler(req, res) {
	if (req.method.toUpperCase() !== "POST") {
		res.status(405).json({ message: "Invalid Request" });
		return;
	}

	if (!req.body?.uid || !req.body?.data?.name) {
		res.status(422).json({ message: "Invalid Data" });
		return;
	}

	return await prisma.project
		.create({
			data: {
				...req.body.data,
				owner: {
					connect: {
						id: req.body.uid,
					},
				},
			},
		})
		.then(async (result) => {
			res.status(201).json({ message: "Project Created!", data: { project: result } });
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
}
