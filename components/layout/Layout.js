import Nav from "../nav/Nav";
import PageHead from "./PageHead";
import { useAuthUser } from "../../lib/hooks/hooks";
import Sidebar from "../nav/RyanSidebar";

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
			<main>
				<div className='navbar-layout'>
					<Sidebar />
					<Nav />
					{children}
				</div>
			</main>
		</>
	);
}
