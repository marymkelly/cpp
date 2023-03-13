import { useContext } from "react";
import AuthContext from "../../context/AuthCtx";
import ThemeContext from "../../context/ThemeCtx";

export function useAuthUser() {
	const authCtx = useContext(AuthContext);
	return { user: authCtx.user, authorized: authCtx.isAuthorized };
}

export function useTheme() {
	const themeCtx = useContext(ThemeContext);
	return themeCtx.theme
}
