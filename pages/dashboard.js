import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthCtx";
import { getUserFromDatabase } from "../lib/user";
import { useAuthUser } from "../lib/hooks/hooks";
import ProjectForm from "../components/projectForm/ProjectForm";
import { setUserProperties } from "firebase/analytics";
import SquareButton from "../components/common/SquareButton";

export default function Dashboard(props) {
	const router = useRouter();
	const { user, authorized } = useAuthUser();
	const [projects, setProjects] = useState([]);
	const [recentProjects, setRecentProjects] = useState([]);

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
		async function getDatabaseUser(id) {
			let user = await getUserFromDatabase(id, "id").then((res) => {
				return res;
			});
			console.log("USER!", user);
			if (user.projects) {
				setProjects(user.projects);
				let recents = user.projects.sort((a, b) => {
					let aUpdated = Date.parse(new Date(a.lastUpdated));
					let bUpdated = Date.parse(new Date(b.lastUpdated));

					return bUpdated - aUpdated;
				});

				setRecentProjects(recents.slice(0, 4));
			}

			return user;
		}
		if (authorized && user?.id) {
			getDatabaseUser(user.id);
		}
	}, [user, authorized]);

	// useEffect(() => {
	// 	console.log("RECENT PROJECTS ", recentProjects);
	// }, [recentProjects]);

	const [formActive, setFormActive] = useState(false);

	const toggleForm = () => {
		if (formActive === false) {
			setFormActive(true);
		} else {
			setFormActive(false);
		}
	};

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
			<ProjectForm
				formActive={formActive}
				setFormActive={setFormActive}
				toggleForm={toggleForm}
			/>
			<h2 className='dash-header md:9'>Dashboard</h2>
			<div className='recent-projects'>
				<h3 className='dash-subheader'>Recent Projects</h3>
				<div className='flex items-center justify-items-center'>
					<div className='grid max-h-[220px] w-6/12 grid-cols-2 gap-4'>
						{recentProjects?.length > 0 &&
							recentProjects.map((proj, i) => {
								return (
									<a
										key={`recent-proj-${i}`}
										href={`/projects/${proj.id}`}
										className='group col-span-1 flex max-h-[106px] w-full max-w-xs flex-col content-center justify-center justify-items-center rounded-2xl border-[1.75px] border-custom-gray-blue-mid/40 px-10 py-5 hover:border-[#CFF8F3]/80 hover:bg-[#CFF8F3]/80'>
										<h4 className='mb-2.5 font-readex text-xl font-normal text-[#505050] group-hover:text-[#046A5E]'>
											{proj.name}
										</h4>
										<p className='mb-1.5 text-[14px] text-custom-gray-blue-mid'>
											{Date.parse(new Date(Date.now)) -
												Date.parse(new Date(proj.lastUpdated)) <
												86400000 &&
											Date.parse(new Date(Date.now)) -
												Date.parse(new Date(proj.created)) <
												86400000
												? "Created "
												: "Updated "}
											{Date.parse(new Date(Date.now)) -
												Date.parse(new Date(proj.lastUpdated)) <
											86400000
												? "Today"
												: new Date(proj.lastUpdated).toLocaleDateString()}
										</p>
									</a>
								);
							})}
					</div>
					<div className='ml-6 flex h-full flex-auto items-center justify-items-start pb-4'>
						<button
							className='new-proj-btn flex h-full self-start align-top'
							onClick={async (e) => {
								toggleForm();
								let req = {
									data: testPojectData,
									id: user.id,
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
				</div>
			</div>
			<SquareButton label='Test' inverse={true} classNames='w-[120px] py-3' />
			<div className='max-h-[300px] overflow-scroll overscroll-contain hidden'>
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
