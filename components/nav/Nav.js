import { signOutUser } from "../../firebase/auth";
import { useAuthUser, useProjectPage } from "../../lib/hooks/hooks";
import { ProjectExtendedNav, ProjectHeaderNav } from "./ProjectPageNav";

export default function Nav() {
	const { user } = useAuthUser();
	const { projectPage } = useProjectPage();

	return (
		<>
			<nav className={`nav-container ${projectPage ? "proj-page" : ""} `}>
				<ProjectHeaderNav />

				<div className='user-greeting'>
					Hello!{" "}
					<span className='name'>
						{user?.profile?.name?.display ?? user?.displayName}
					</span>
				</div>
				<button
					className='logout-btn'
					onClick={() => {
						signOutUser();
					}}>
					Log Out
				</button>
			</nav>
			<ProjectExtendedNav projectPage={projectPage} />
		</>
	);
}
