import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import CaretDownIcon from "../assets/icons/CaretDown";
import ChevronDownIcon from "../assets/icons/ChevronDown";
import Dot from "../assets/icons/Dot";
import { useProjectPage } from "../../lib/hooks/hooks";
import ProjectContext from "../../context/ProjectCtx";
import NotificationContext from "../../context/NotificationCtx";

const statusColors = {
	none: {
		button: "bg-slate-200/40 text-slate-500/70",
		dot: "text-slate-400/50",
	},
	active: {
		button: "bg-[#36C7B5]/[08%] text-logo-green",
		dot: "text-custom-green-accent/75",
	},
	cancelled: {
		button: "border-[1.25px] border-logo-black/[32%] text-logo-black/40",
		dot: "fill-none border border-logo-black/30 bg-logo-black/[04%] rounded-full",
	},
	complete: {
		button: "border-[1.25px] border-custom-green-accent/50 text-logo-green/80",
		dot: "text-custom-green-accent/10 border-[1.25px] rounded-full border-logo-green/60",
	},
	late: {
		button: "bg-orange-200/20 text-amber-600/60",
		dot: "text-amber-500/50",
	},
	paused: {
		button: "bg-sky-200/20 text-sky-800/50",
		dot: "text-sky-600/30",
	},
	priority: {
		button: "bg-indigo-200/25 text-indigo-700/50",
		dot: "text-indigo-500/40",
	},
};

export function ProjectExtendedNav({ projectPage }) {
	return projectPage ? (
		<div className='absolute top-[75px] -z-[1] h-[47px] w-[91.9%] border-b-[1.5px] border-[#8FDCD0]/75 py-1 px-4'>
			<button className='flex items-center justify-center rounded-md bg-[#2D748B]/[12%] px-4 py-1.5 font-urbanist font-semibold tracking-[.02em] text-[#075B77] hover:bg-[#2D748B]/20'>
				Overview
			</button>
		</div>
	) : null;
}

export function ProjectHeaderNav() {
    const router = useRouter();
    const projectCtx = useContext(ProjectContext);
	const notifCtx = useContext(NotificationContext);
	const { projectPage, data } = useProjectPage();
	const [showStatusSelect, setShowStatusSelect] = useState(false);
	const [projStatus, setProjStatus] = useState();

	useEffect(() => {
		function clickListener() {
			setShowStatusSelect(false);
		}
		window.addEventListener("click", clickListener);

		return () => {
			window.removeEventListener("click", clickListener);
		};
	}, []);

	useEffect(() => {
		if (data) {
			let s = data?.status ?? "none";
			setProjStatus(s);
		}
	}, [router, data]);

	return (
		projectPage && (
			<div className='flex flex-auto'>
				<div className='ml-4 text-custom-black-text'>
					<h2 className='flex items-center font-urbanist text-[30px] font-medium tracking-[.01em]'>
						{data.name}
						<span className='ml-1.5 -mb-1 mr-1.5 opacity-30'>
							<ChevronDownIcon className='hidden h-6 w-6' />
						</span>
					</h2>
				</div>
				<button
					onClick={(e) => {
						e.stopPropagation();
						setShowStatusSelect(!showStatusSelect);
					}}
					type='button'
					className={`relative ml-4 flex items-center rounded-lg px-5 py-2 font-normal ${
						statusColors?.[projStatus]?.button
					} ${projStatus === "none" ? "" : "capitalize"}`}>
					{projStatus !== "none" ? projStatus : "Add status"}
					<span>
						<Dot
							className={`mt-px ml-2 h-[9px] w-[9px] ${statusColors?.[projStatus]?.dot}`}
						/>
					</span>
					{showStatusSelect ? (
						<span className='absolute left-0 top-full z-40 mt-1 flex w-full min-w-fit flex-col rounded-lg border bg-white'>
							{Object.keys(statusColors).map((key, i) => {
								let status = projStatus ? projStatus.toLowerCase() : "none";
								if (key !== status)
									return (
										<p
											key={`status-option-${i}`}
											onClickCapture={(e) => {
												e.stopPropagation();
												setProjStatus(key);

												async function updateProject(status) {
													await axios({
														url: `/api/project/${data.id}`,
														method: "put",
														data: {
															status,
														},
													})
														.then((res) => {
															notifCtx.setNotification({
																message:
																	res?.data?.message ??
																	"Update Successful!",
																type: "success",
															});

															if (res.data?.data?.project) {
																projectCtx.setProjectData(
																	res.data.data.project
																);
															}
															setShowStatusSelect(false);
														})
														.catch((err) => {
															notifCtx.setNotification({
																message: err.message,
																type: "error",
															});
														});
												}
												updateProject(key);
											}}
											className={`capitalize ${statusColors[key].button} border-none bg-transparent py-1.5 px-6 hover:bg-custom-navy/[04%]`}>
											{key}
										</p>
									);
							})}
						</span>
					) : null}
				</button>
			</div>
		)
	);
}
