function XMarkIcon(props) {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			className={props.className}
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M4.5 19.5L19.5 4.5M4.5 4.5L19.5 19.5'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

export default XMarkIcon;
