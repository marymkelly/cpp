import Nav from "../nav/Nav";
import PageHead from "./PageHead";
import { useAuthUser } from "../../lib/hooks/hooks";
import Sidebar from "../nav/Sidebar";
import { useEffect, useState, useContext } from "react";
import MobileTabBar from "../nav/MobileNav";
import LoadingPage from "../LoadingPage.tsx";
import AuthContext from "../../context/AuthCtx";

export default function Layout({ children }) {
	const authCtx = useContext(AuthContext);
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
						<div className='mt-20'>{children}</div>
					</div>
				</main>
			)}
		</>
	);
}
