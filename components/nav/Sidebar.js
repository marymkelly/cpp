import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthUser } from "../../lib/hooks/hooks";
import CogIcon from "../assets/icons/Cog";
import MenuBarsIcon from "../assets/icons/MenuBars";
import HomeIcon from "../assets/icons/House";
import LayersIcon from "../assets/icons/Layers";
import BarChartIcon from "../assets/icons/ChartBar";
import SagaLogo from "../assets/logo/Saga";
import SagaLogoUpdated from "../assets/logo/SagaUpdated";
import twColors from "tailwindcss/colors";

export default function Sidebar() {
	const router = useRouter();
	const { user } = useAuthUser();
	const [open, setOpen] = useState(false);

	const colors = [];

	console.log('user ', user)

	for (let [color, val] in twColors) {
		let colorClass = "bg-";
		if (typeof (twColors[color] === "string")) {
			colorClass += twColors[color];
		}
	}

	// console.log("TAILWIND COLORS", twColors);

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
			<SagaLogoUpdated theme='dark' className='sidebar-logo-updated' />

			{user ? (
				<div className='current-user'>
					<div className='user-group'>
						{user?.profile?.photo ? (
							<Image src={user?.profile?.photo} alt='Profile Picture' width={44} height={44} />
						) : (
							<div className='bg h-full w-full'>{}</div>
						)}
						<p>{user?.profile?.name?.display}</p>
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
