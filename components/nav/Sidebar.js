export default function Sidebar() {
	const { user } = useAuthUser();

	return (
		<nav className='sidebar-container'>
			<div className=''>{/* Hello! <span className='name'>{user?.profile?.name ?? user?.displayName}</span> */}</div>
		</nav>
	);
}
