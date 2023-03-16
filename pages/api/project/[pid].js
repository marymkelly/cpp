import prisma from "../../../db/prisma";

export default async function handler(req, res) {
	// if (req.method.toUpperCase() !== "PUT" || req.method.toUpperCase() !== "DELETE") {
	// 	res.status(405).json({ message: "Invalid Request" });
	// 	return;
	// }

	const { pid } = req.query;

	if (req.method.toUpperCase() === "PUT") {
		return await prisma.project
			.update({
				where: {
					id: pid,
				},
				data: {
					...req.body,
				},
			})
			.then(async (result) => {
				res.status(201).json({ message: "Project Updated!", data: { project: result } });
				return;
			})
			.catch((error) => {
				res.status(500).json({ message: "Database Error", error });
				return;
			});
	} else {
		res.status(405).json({ message: "Invalid Request" });
		return;
	}
}
