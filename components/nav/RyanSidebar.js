import { signOutUser } from "../../firebase/auth";
import { useAuthUser } from "../../lib/hooks/hooks";

export default function Sidebar() {
	const { user } = useAuthUser();

	let sidebar = document.querySelector(".side-bar");



	return (
		<nav className='side-bar'>
			<div className='menu-button-container'>
				<div className='logo'></div>
				<div onClick={() => {
					sidebar.classList.toggle("close")
				}} className='sidebar-button'>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
			<div className='user-container'>
				<div className='user-content'>
					<img src='images/profile-placeholder-img.jpeg' />
					{user?.profile?.name ?? user?.displayName}
				</div>
				<span className='options-button' />
			</div>
			<ul className='list'>
				<li>
					<span className='dashboard' />
					<div>Dashboard</div>
				</li>
				<li>
					<span className='project' />
					<div>Projects</div>
				</li>
				<li>
					<span className='analytics' />
					<div>Analytics</div>
				</li>
			</ul>
		</nav>
	);
}
