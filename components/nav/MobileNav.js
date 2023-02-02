import HomeIcon from "../assets/icons/House";
import LayersIcon from "../assets/icons/Layers";
import BarChartIcon from "../assets/icons/ChartBar";
import Link from "next/link";
import { useRouter } from "next/router";
import VerticalEllipsisIcon from "../assets/icons/VerticalEllipsis";
import PlusIcon from "../assets/icons/Plus";

export default function MobileTabBar() {
	const router = useRouter();

	const pages = [
		{ name: "Dashboard", href: "/dashboard", icon: HomeIcon },
		{ name: "Projects", href: "/projects", icon: LayersIcon },
		{ name: "New", href: "", icon: PlusIcon },
		{ name: "Analytics", href: "/analytics", icon: BarChartIcon },
		{ name: "More", href: "/analytics", icon: VerticalEllipsisIcon },
	];

	return (
		<nav className={`bottom-nav-container`}>
			{/* {user ? <Image src={user?.photoURL} alt='Profile Picture' width={44} height={44} /> : null} */}
			<div className='tab-container'>
				{pages.map((page, i) => {
					return (
						<div key={`page-${i}`} className={router.pathname === page.href ? "nav-link active" : "nav-link"}>
							<Link href={page.href}>
								<page.icon className={page.name === "New" ? "plus" : ""} />
							</Link>
						</div>
					);
				})}
			</div>
		</nav>
	);
}
