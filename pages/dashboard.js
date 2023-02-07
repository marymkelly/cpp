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
import ProjectForm from "../components/projectForm/ProjectForm";
import { setUserProperties } from "firebase/analytics";

export default function Dashboard(props) {
	const router = useRouter();
	const { user, authorized } = useAuthUser();
	const [projects, setProjects] = useState([]);

	const testPojectData = {
		name: "Test Project 1",
		description: "test data for seetting up projects in db",
		teamSize: 1,
		type: "Personal Project",
		role: {
			title: "Developer & Designer",
			description: "I did some awesome things. Bam.",
		},
	};

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

	useEffect(() => {
		// console.log("USER", user, projects);
	}, [user, projects]);

	const [formActive, setFormActive] = useState(false)

	const toggleForm = () => {
		if(formActive === false) {
			setFormActive(true)
		} else {
			setFormActive(false)
		}
	}

	return (
		// <div className='dashboard-page'>
		// 	<div className='dash-container'>
		// 		<h2 className='dash-header'>Dashboard</h2>
		// 		<ul>
		// 			{projects &&
		// 				projects?.length > 0 &&
		// 				projects.map((project) => {
		// 					return (
		// 						<li key={project.title}>
		// 							{project?.title}
		// 							<ul>
		// 								<li>{project?.description}</li>
		// 							</ul>
		// 						</li>
		// 					);
		// 				})}
		// 		</ul>
		// 	</div>
		// </div>
		<div className='dashboard-container'>
			<ProjectForm formActive={formActive} setFormActive={setFormActive} toggleForm={toggleForm}/>
			<h2 className='dash-header md:9'>Dashboard</h2>
			<div className='recent-projects'>
				<h3 className='dash-subheader'>Recent Projects</h3>

				<button
					className='new-proj-btn'
					onClick={async (e) => {
						toggleForm()
						let req = {
							data: testPojectData,
							uid: user.uid,
						};

						async function createProject(data) {
							const projectResults = await fetch(`/api/project`, {
								method: "post",
								body: JSON.stringify(data),
								headers: {
									"Content-Type": "application/json",
								},
							})
								.then((r) => r.json())
								.catch((err) => err);

							return projectResults;
						}

						let createdProject = await createProject(req);
						console.log("CREATED PROJECT?", createdProject);
					}}>
					<svg viewBox='-5 -5 370 240' xmlns='http://www.w3.org/2000/svg'>
						<path d='M 20 0 L 340 0 C 350 0 360 10 360 20  L 360 210 C 360 220 350 230 340 230 L 20 230 C 10 230 0 220 0 210 L 0 20 C 0 10 10 0 20 0 Z' />
					</svg>
					<h5 className='btn-label'>Add New Project</h5>
				</button>
			</div>
			<div>
				{projects &&
					projects?.length > 0 &&
					projects.map((project, i) => {
						return (
							<ul key={`${project.name}-${i}`}>
								{project?.name}
								<ul>
									<li>{project?.description}</li>
								</ul>
							</ul>
						);
					})}
			</div>
		</div>
	);
}
