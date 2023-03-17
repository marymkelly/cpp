import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthUser } from "../../../lib/hooks/hooks";
import NotificationComponent from "../../../components/Notification";

export default function ProjectPage() {
	const router = useRouter();
	const { user, authorized, loading } = useAuthUser();
	const [data, setData] = useState({});

	useEffect(() => {
		const pid = router.query.pid;

		if (!loading) {
			if (user?.projects) {
				const validProj = user.projects.find((p) => p.id === pid);
				if (validProj) setData(validProj);
			}
		}
	}, [loading, user, authorized]);

	// const { data, error, isLoading } = useSWR('/api/user/123', fetcher)

	return (
		<div className='px-5 py-2.5 h3-medium h3-lg'>
			{/* <h2 className='dash-header ml-8'>Project ID: {data?.id}</h2> */}
			<div className='ml-4 flex w-full max-w-[700px] flex-col'>
				<div className='mt-6'>
					<div className='mb-4 flex items-center align-baseline'>
						<h3 className='min-w-[120px]'>Category</h3>
						<p className='font-urbanist text-base font-normal'>
							{data?.category ?? "None"}
						</p>
					</div>
					<div className='mb-4 flex items-center align-baseline'>
						<h3 className='min-w-[120px]'>Client</h3>
						<p className='font-urbanist text-base font-normal'>
							{data?.client ?? "None"}
						</p>
					</div>
				</div>
				<div className='mb-7 mt-4 w-[700px] border-b-[1.25px] border-[#768F97]/[35%]' />
				<div>
					<h3 className='mb-4'>Dates</h3>
					{data?.dates?.length > 0 ? (
						data.dates.map((date, i) => {
							return (
								<div
									key={`dates-${i}`}
									className='mb-4 flex items-center align-baseline'>
									<h4 className='min-w-[120px] font-medium text-[#075B77]/80'>
										{date?.type}
									</h4>
									<p className='font-urbanist text-base font-normal'>
										{date?.date}
									</p>
								</div>
							);
						})
					) : (
						<p className='mb-1'>No Dates</p>
					)}
				</div>
				<div className='my-6 mt-8 w-[700px] border-b-[1.25px] border-[#768F97]/[35%]' />
				<h3 className='mb-4'>Summary</h3>
				<div className='mb-2 h-40 w-full bg-[#F4F8FB]/70 py-2 px-3 font-urbanist text-base text-logo-black'>
					{data?.description}
				</div>
				<div className='my-6 mt-8 w-[700px] border-b-[1.25px] border-[#768F97]/[35%]' />
				<div className='mb-4 flex items-center align-baseline'>
					<h3 className='min-w-[120px]'>Team Size</h3>
					<p className='font-urbanist text-base font-normal'>{data?.teamSize}</p>
				</div>
				<div className='mb-3 flex align-baseline'>
					<h4 className='min-w-[120px] font-medium text-[#075B77]/80'>Your Role</h4>
					<div className='mb-4 flex flex-col'>
						<p className='font-urbanist text-base font-normal'>{data?.role?.title}</p>
						<p className='hidden font-urbanist text-base font-normal'>
							{data?.role?.description}
						</p>
					</div>
				</div>
				<div className='w-[700px] border-b-[1.25px] border-[#768F97]/[35%]' />
			</div>
		</div>
	);
}
