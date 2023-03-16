import { useContext } from "react";
import AuthContext from "../../context/AuthCtx";
import ThemeContext from "../../context/ThemeCtx";
import ProjectContext from "../../context/ProjectCtx";

export function useAuthUser() {
	const authCtx = useContext(AuthContext);
	return { user: authCtx.user, authorized: authCtx.isAuthorized, loading: authCtx.isLoading };
}

export function useProjectPage() {
	const projectCtx = useContext(ProjectContext);
	return {
		authorized: projectCtx.isAuthorized,
		data: projectCtx.projectData,
		projectPage: projectCtx.isProjectPage,
	};
}

export function useTheme() {
	const themeCtx = useContext(ThemeContext);
	return themeCtx.theme;
}
