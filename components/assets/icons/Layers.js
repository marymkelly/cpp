function LayersIcon(props) {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			stroke='currentColor'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={props.className}>
			<path d='M21 12L12 18L3 12M21 16L12 22L3 16M21 8L12 14L3 8L12 2L21 8Z' strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	);
}

export default LayersIcon;
