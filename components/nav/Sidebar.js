import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthUser } from "../../lib/hooks/hooks";
import CogIcon from "../assets/icons/Cog";
import MenuBarsIcon from "../assets/icons/MenuBars";
import HomeIcon from "../assets/icons/House";
import LayersIcon from "../assets/icons/Layers";
import BarChartIcon from "../assets/icons/Chart-Bar";
import SagaLogo from "../assets/logo/Saga";
import SagaLogoUpdated from "../assets/logo/SagaUpdated";

export default function Sidebar() {
	const router = useRouter();
	const { user } = useAuthUser();
	const [open, setOpen] = useState(false);
	// console.log('ROUTER: ', router);

	const pages = [
		{
			name: "Dashboard",
			href: "/dashboard",
			icon: HomeIcon,
		},
		{
			name: "Projects",
			href: "/projects",
			icon: LayersIcon,
		},
		{
			name: "Analytics",
			href: "/analytics",
			icon: BarChartIcon,
		},
	];

	return (
		<nav className={`sidebar-container${open ? " open" : ""}`}>
			<div
				className={`menu-btn${open ? " open" : ""}`}
				onClick={() => {
					setOpen(!open);
				}}>
				<MenuBarsIcon className='logo-green' />
			</div>
			{/* <SagaLogo className='logo-light sidebar-logo' /> */}
			<SagaLogoUpdated theme="dark" className='sidebar-logo-updated' />

			{user ? (
				<div className='current-user'>
					<div className='user-group'>
						<Image src={user?.photoURL} alt='Profile Picture' width={44} height={44} />
						<p>{user?.displayName}</p>
					</div>
					<CogIcon className='logo-green-bright cog' />
				</div>
			) : null}

			<div className='links-container'>
				{pages.map((page, i) => {
					return (
						<div key={`page-${i}`} className={`${router.pathname === page.href ? "nav-link active" : "nav-link"} ${open ? "open" : ""}`}>
							<Link href={page.href}>
								<span>
									<page.icon className={open ? "open" : ""} />
								</span>
								<p>{page.name}</p>
							</Link>
						</div>
					);
				})}
			</div>
		</nav>
	);
}
