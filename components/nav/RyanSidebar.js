import { signOutUser } from "../../firebase/auth";
import { useAuthUser } from "../../lib/hooks/hooks";

export default function Sidebar() {
	const { user } = useAuthUser();

	return (
		<nav className='side-bar'>
			<div className='menu-button-container'>
				<div className='logo'></div>
				<div className='sidebar-button'>
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
				<img className='options-button' src='images/cog-6-tooth.png' />
			</div>
			<ul className='list'>
                <li>
                    <img src="images/House_01.png"/>
                    Dashboard
                </li>
                <li>
                    <img src="images/"/>
                    Projects
                </li>
                <li>
                    <img src="images/"/>
                    Analytics
                </li>
            </ul>
		</nav>
	);
}
