import { useContext } from "react";
import AuthContext from "../../context/AuthCtx";

export function useAuthUser() {
	const authCtx = useContext(AuthContext);

	return { user: authCtx.user, authorized: authCtx.isAuthorized };
}
