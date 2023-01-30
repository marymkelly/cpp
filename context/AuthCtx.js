import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { authStateListener } from "../firebase/auth";

const AuthContext = createContext({
	user: null,
	isAuthorized: false,
});

export function AuthContextProvider(props) {
	const router = useRouter();
	const [currentUser, setCurrentUser] = useState({});
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		authStateListener((user) => {
			if (user) {
				// console.log("user detected", user);
				setCurrentUser(user);
				setAuthorized(true);
			} else {
				console.log("no user detected");
				setCurrentUser({});
				setAuthorized(false);
			}
		});
	}, []);

	useEffect(() => {
		if (currentUser?.uid && router.pathname === "/") {
			router.push("/dashboard");
		}

		if (!currentUser?.uid && router.pathname === "/dashboard") {
			router.push("/");
		}
	}, [router, currentUser]);

	const context = {
		user: currentUser,
		isAuthorized: authorized,
	};

	return <AuthContext.Provider value={context}>{props.children}</AuthContext.Provider>;
}

export default AuthContext;
