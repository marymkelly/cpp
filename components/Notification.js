import { useContext, useEffect } from "react";
import XMarkIcon from "./assets/icons/XMark";
import NotificationContext from "../context/NotificationCtx";
import {
	CheckCircleIcon,
	ExclamationCircleIcon,
	ExclamationTriangleIcon,
	InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function NotificationComponent() {
	const notifCtx = useContext(NotificationContext);
	let {
		data: { message = "testing test message", type = "general" },
		displayed,
	} = notifCtx;

	useEffect(() => {
		console.log("displayed?", displayed);
	}, [displayed]);

	const typeColors = {
		success: "bg-[#00DEA9]",
		warning: "bg-[#EA9921]",
		error: "bg-[#E00043]",
		general: "bg-[#07A1E3]",
	};

	const typeIcons = {
		success: <CheckCircleIcon className='h-6 w-6 stroke-2 text-white' />,
		warning: <ExclamationCircleIcon className='h-6 w-6 stroke-2 text-white' />,
		error: (
			<ExclamationTriangleIcon className='-mb-0.5 mr-0.5 h-[23px] w-[23px] stroke-2 text-white/90' />
		),
		general: <InformationCircleIcon className='h-6 w-6 stroke-[1.75px] text-white/90' />,
	};

	return (
		<>
			<div
				className={`${
						displayed ? "flex" : "hidden sm:hidden"
				} pointer-events-none fixed inset-x-0 top-[15%] sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8`}>
				<div className='relative w-full  max-w-[300px] sm:min-w-[300px] sm:max-w-0 lg:min-w-[450px]'>
					<div
						className={`${typeColors[type]} pointer-events-auto flex justify-between gap-x-2 py-2.5 px-6 shadow-md shadow-slate-600/[12%] sm:py-3 sm:pr-3.5 sm:pl-4`}>
						{typeIcons[type]}
						<p className='w-full text-sm font-medium leading-6 tracking-wide text-white lg:ml-2'>
							{message}
						</p>
						<button
							onClick={() => {
								notifCtx.setNotification(false);
							}}
							type='button'
							className='-m-1.5 ml-2 flex-none p-1.5'>
							<span className='sr-only'>Dismiss</span>
							<XMarkIcon
								className='h-[18px] w-[18px] stroke-[2.5px] text-white hover:opacity-60'
								aria-hidden='true'
							/>
						</button>
					</div>
					{/* <div
						id='timeout-bar'
						className='absolute z-[1000] h-full w-full top-0 bg-white/20'
					/> */}
				</div>
			</div>
		</>
	);
}
