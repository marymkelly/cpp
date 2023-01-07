import PageHead from "./PageHead";

export default function Layout({ children }) {
	return (
		<>
			<PageHead />
			{children}
		</>
	);
}
