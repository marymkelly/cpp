import { signOutUser } from "../../firebase/auth";
import { useAuthUser } from "../../lib/hooks/hooks";

export default function Nav() {
	const { user } = useAuthUser();

	return (
		<nav className='nav-container'>
			<div className='user-greeting'>
				Hello! <span className='name'>{user?.profile?.name ?? user?.displayName}</span>
			</div>
			<button className='logout-btn' onClick={() => signOutUser()}>
				Log Out
			</button>
		</nav>
	);
}
