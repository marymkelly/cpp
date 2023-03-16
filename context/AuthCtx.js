import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { authStateListener } from "../firebase/auth";
import { clientUserFormat } from "../lib/ts/auth";
import { getUserFromDatabase } from "../lib/user";
import ProjectContext from "./ProjectCtx";

const AuthContext = createContext({
	user: null,
	isAuthorized: false,
	isLoading: false,
	setLoading: function (bool) {},
	setUser: function (obj) {},
});

export function AuthContextProvider(props) {
	const router = useRouter();
	const projectCtx = useContext(ProjectContext);
	const [currentUser, setCurrentUser] = useState({});
	const [authorized, setAuthorized] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		authStateListener(async (user) => {
			if (user) {
				const dbUser = await getUserFromDatabase(user.uid, "fid");
				console.log("user detected", {
					id: dbUser?.id,
					profile: dbUser?.profile,
					projects: dbUser?.projects ?? [],
				});
				setCurrentUser({
					id: dbUser?.id,
					profile: dbUser?.profile,
					projects: dbUser?.projects ?? [],
				});
				setAuthorized(true);
				// setLoading(false);
			} else {
				console.log("no user detected");
				setCurrentUser({});
				setAuthorized(false);
				// setLoading(false);
			}
		});
	}, []);

	useEffect(() => {
		if (router.isReady) {
			if (router.pathname === "/projects/[pid]") {
				const pid = router.query.pid;

				if (currentUser?.projects) {
					const validProj = currentUser.projects.find((p) => p.id === pid);
					if (validProj) {
						projectCtx.setProjectData(validProj);
						projectCtx.setAuthorized(true);
						setLoading(false);
					} else {
						projectCtx.setProjectData();
						projectCtx.setAuthorized();
						router.push("/projects");
					}
				}
			} else {
				setLoading(false);
			}
		}

		if (!loading) {
			if (currentUser?.id && router.pathname === "/") {
				router.push("/dashboard");
			}
			if (!currentUser?.id && router.pathname !== "/") {
				router.push("/");
			}
		}
	}, [router, currentUser, loading]);

	function setLoadingState(bool) {
		setLoading(bool);
	}

	function setUser(user) {
		setCurrentUser(user);
	}

	const context = {
		user: currentUser,
		setUser: setUser,
		isAuthorized: authorized,
		isLoading: loading,
		setLoading: setLoadingState,
	};

	return <AuthContext.Provider value={context}>{props.children}</AuthContext.Provider>;
}

export default AuthContext;
