import Nav from "../nav/Nav";
import PageHead from "./PageHead";
import { useAuthUser } from "../../lib/hooks/hooks";
import RyanSidebar from "../nav/RyanSidebar";
import Sidebar from "../nav/Sidebar";
import { useEffect, useState } from "react";
import MobileTabBar from "../nav/MobileNav";

export default function Layout({ children }) {
	const { user, authorized } = useAuthUser();
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		function handleResize() {
			if (window.visualViewport.width < 640) {
				setIsMobile(true);
			}

			if (window.visualViewport.width > 640) {
				setIsMobile(false);
			}
		}

		if (window.visualViewport.width < 640) {
			setIsMobile(true);
		}

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return !authorized ? (
		<>
			<PageHead />
			{children}
		</>
	) : (
		<>
			<PageHead />
			{/* <main>
				<div className='navbar-layout'>
					<RyanSidebar />
					<Nav />
					{children}
				</div>
			</main> */}
			<main className='main-wrapper'>
				<div className='side-container'>{isMobile ? <MobileTabBar /> : <Sidebar />}</div>
				<div className='main-container'>
					<Nav />
					{children}
				</div>
			</main>
		</>
	);
}
