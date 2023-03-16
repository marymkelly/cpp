function Dot(props) {
	return (
		<svg
			viewBox='0 0 100 100'
			className={props.className}
			fill='currentColor'
			stroke='currentColor'
			xmlns='http://www.w3.org/2000/svg'>
			<circle cx='50' cy='50' r='50' />
		</svg>
	);
}

export default Dot;
