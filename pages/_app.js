import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { AuthContextProvider } from "../context/AuthCtx";
import { app, analytics } from "../firebase/firebase";

export default function App({ Component, pageProps }) {
	useEffect(() => {
		analytics(app);
	}, []);

	return (
		<AuthContextProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AuthContextProvider>
	);
}
