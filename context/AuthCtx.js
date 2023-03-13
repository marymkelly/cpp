import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { authStateListener } from "../firebase/auth";
import { clientUserFormat } from "../lib/ts/auth";
import { getUserFromDatabase } from "../lib/user";

const AuthContext = createContext({
	user: null,
	isAuthorized: false,
	isLoading: false,
	setLoading: function (bool) {},
	setUser: function (obj) {},
});

export function AuthContextProvider(props) {
	const router = useRouter();
	const [currentUser, setCurrentUser] = useState({});
	const [authorized, setAuthorized] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		authStateListener(async (user) => {
			if (user) {
				console.log("user detected", user);
				const dbUser = await getUserFromDatabase(user.uid, "fid");
				setCurrentUser({
					id: dbUser?.id,
					profile: dbUser?.profile,
					projects: dbUser?.projects ?? [],
				});
				setAuthorized(true);
			} else {
				console.log("no user detected");
				setCurrentUser({});
				setAuthorized(false);
			}

			setLoadingState(false);
		});
	}, []);

	useEffect(() => {
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
