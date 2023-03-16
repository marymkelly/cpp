import Nav from "../nav/Nav";
import PageHead from "./PageHead";
import { useAuthUser } from "../../lib/hooks/hooks";
import Sidebar from "../nav/Sidebar";
import { useEffect, useState, useContext } from "react";
import MobileTabBar from "../nav/MobileNav";
import LoadingPage from "../LoadingPage.tsx";
import AuthContext from "../../context/AuthCtx";
import NotificationComponent from "../Notification";
import ProjectContext from "../../context/ProjectCtx";

export default function Layout({ children }) {
	const authCtx = useContext(AuthContext);
	const projectCtx = useContext(ProjectContext);
	const { projectPage } = projectCtx;
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

	return (
		<>
			<PageHead />
			{authCtx.isLoading && <LoadingPage />}
			{!authorized || !user ? (
				children
			) : (
				<main className='main-wrapper'>
					<div className='side-container'>
						{isMobile ? <MobileTabBar /> : <Sidebar />}
					</div>
					<div className='main-container'>
						<Nav />
						<div className={`${projectPage ? "mt-20" : "mt-32"}`}>{children}</div>
					</div>
				</main>
			)}
			<NotificationComponent />
		</>
	);
}
