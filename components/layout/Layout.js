import Nav from "../nav/Nav";
import PageHead from "./PageHead";
import { useAuthUser } from "../../lib/hooks/hooks";

export default function Layout({ children }) {
	const { user, authorized } = useAuthUser();
	return !authorized ? (
		<>
			<PageHead />
			{children}
		</>
	) : (
		<>
			<PageHead />
			<Nav />
			{children}
		</>
	);
}
