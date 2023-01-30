// import { useContext, useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import AuthContext from "../context/AuthCtx";
// import { getUserFromDatabase } from "../lib/user";
// import { useAuthUser } from "../lib/hooks/hooks";

// export default function Dashboard(props) {
// 	const router = useRouter();
// 	const { user, authorized } = useAuthUser();
// 	const [projects, setProjects] = useState([]);

// 	useEffect(() => {
// 		async function getDatabaseUser(uid) {
// 			let user = await getUserFromDatabase(uid).then((res) => {
// 				return res.data?.user;
// 			});
// 			if (user?.projects) setProjects(user.projects);
// 			return user;
// 		}
// 		if (authorized && user?.uid) {
// 			getDatabaseUser(user.uid);
// 		}
// 	}, [user, authorized]);

// 	return (
// 		<div>
// 			<h2 className='dash-header'>Dashboard</h2>
// 			<ul>
// 				{projects &&
// 					projects?.length > 0 &&
// 					projects.map((project) => {
// 						return (
// 							<li key={project.title}>
// 								{project?.title}
// 								<ul>
// 									<li>{project?.description}</li>
// 								</ul>
// 							</li>
// 						);
// 					})}
// 			</ul>
// 		</div>
// 	);
// }

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthCtx";
import { getUserFromDatabase } from "../lib/user";
import { useAuthUser } from "../lib/hooks/hooks";
import Sidebar from "../components/nav/RyanSidebar";

export default function Dashboard(props) {
	const router = useRouter();
	const { user, authorized } = useAuthUser();
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		async function getDatabaseUser(uid) {
			let user = await getUserFromDatabase(uid).then((res) => {
				return res.data?.user;
			});
			if (user?.projects) setProjects(user.projects);
			return user;
		}
		if (authorized && user?.uid) {
			getDatabaseUser(user.uid);
		}
	}, [user, authorized]);

	return (
			<div className='dashboard-page'>
				<div className='dash-container'>
					<h2 className='dash-header'>Dashboard</h2>
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
				</div>
			</div>
		<div>
			<h2 className='dash-header md:9'>Dashboard</h2>
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
		</div>
	);
}
