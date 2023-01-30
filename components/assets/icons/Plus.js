function PlusIcon(props) {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			stroke='currentColor'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={props.className}>
			<path d='M12 3V21M21 12L3 12' strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	);
}

export default PlusIcon;
