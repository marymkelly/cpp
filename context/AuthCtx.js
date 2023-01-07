import { createContext, useState, useEffect } from "react";
import { authStateListener } from "../firebase/auth";

const AuthContext = createContext({
	user: null, //user.id, user.displayName, user.email, providerId
	isAuthorized: false,
});

export function AuthContextProvider(props) {
	const [currentUser, setCurrentUser] = useState({});
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		authStateListener((user) => {
			if (user) {
				const { displayName, email, uid, providerId } = user;
				console.log("user detected ", displayName, email, uid, "provider:", providerId);
				setCurrentUser({ displayName, email, uid, providerId });
				setAuthorized(true);
			} else {
				console.log("no user detected");
				setCurrentUser({});
				setAuthorized(false);
			}
		});
	}, []);

	const context = {
		user: currentUser,
		isAuthorized: authorized,
	};

	return <AuthContext.Provider value={context}>{props.children}</AuthContext.Provider>;
}

export default AuthContext;
