import prisma from "../../../db/prisma";

export default async function handler(req, res) {
	const { uid, type } = req.query;

	if (req.method.toUpperCase() === "GET") {
		if (!(uid && type))
			return res.status(200).json({ data: { user: undefined } });

		await prisma.user
			.findUnique({ where: { [type]: uid }, include: { projects: true } })
			.then((result) => {
				res.status(200).json({ message: "Query Completed", data: { user: result } });
				return;
			})
			.catch((error) => {
				res.status(500).json({ message: "Database Error", error });
				return;
			});
	} else if (req.method.toUpperCase() === "PUT") {
		return await prisma.user
			.update({
				where: {
					id: uid,
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
			});
	} else if (req.method.toUpperCase() === "DELETE") {
		await prisma.user
			.delete({
				where: {
					id: uid,
				},
			})
			.then(() => {
				res.status(200).json({ message: "Delete Successful", data: { uid } });
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
