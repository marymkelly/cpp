import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const ProjectContext = createContext({
	isProjectPage: false,
	projectData: {},
	setProjectData: function (obj) {},
	isAuthorized: false,
	setAuthorized: function (bool) {},
});

export function ProjectContextProvider(props) {
	const router = useRouter();
	const [userIsAuthorized, setUserIsAuthorized] = useState(false);
	const [isProjectPage, setIsProjectPage] = useState(false);
	const [currentProjectData, setCurrentProjectData] = useState({});

	useEffect(() => {
		router.isReady && router.pathname === "/projects/[pid]"
			? setIsProjectPage(true)
			: setIsProjectPage(false);
	}, [router]);

	function setAuthorizedUser(bool = false) {
		setUserIsAuthorized(bool);
	}

	function setProjectData(data = {}) {
		setCurrentProjectData(data);
	}

	const context = {
		isProjectPage,
		projectData: currentProjectData,
		setProjectData: setProjectData,
		isAuthorized: userIsAuthorized,
		setAuthorized: setAuthorizedUser,
	};

	return <ProjectContext.Provider value={context}>{props.children}</ProjectContext.Provider>;
}

export default ProjectContext;
