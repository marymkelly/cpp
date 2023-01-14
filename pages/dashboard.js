import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthCtx";
import { getUserFromDatabase } from "../lib/user";

export default function Dashboard(props) {
	const authCtx = useContext(AuthContext);
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		async function getDatabaseUser(uid) {
			let user = await getUserFromDatabase(uid).then((res) => {
				return res.data.user;
			});

			if (user?.projects) setProjects(user.projects);
			return user;
		}

		if (authCtx.isAuthorized) {
			let user = authCtx.user;
			getDatabaseUser(user.uid);
		}
	}, [authCtx.isAuthorized]);

	return (
		<main>
			<h2 className="dash-header">Dashboard</h2>
			<ul>
				{projects &&
					projects?.length > 0 &&
					projects.map((project) => {
						return (
							<li key={project.title}>
								{project?.title}
								<ul>
									<li>{project?.description}</li>
								</ul>
							</li>
						);
					})}
			</ul>
		</main>
	);
}
