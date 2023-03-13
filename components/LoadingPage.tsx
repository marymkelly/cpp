import Image from "next/image";
import { useTheme } from "../lib/hooks/hooks";

export default function LoadingPage() {
	const theme = useTheme();

	return (
		<div className='flex h-full w-full items-center justify-center bg-white z-[1000] fixed dark:dark-gradient'>
			<Image className="-ml-5 -mt-8" src={theme === 'dark' ? '/images/SagaAniWhite.gif' : '/images/SagaAniBlack.gif'} alt='Loading animation' width={500} height={250} priority />
		</div>
	);
}
