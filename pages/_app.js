import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { AuthContextProvider } from "../context/AuthCtx";
import { app, analytics } from "../firebase/firebase";
import "normalize.css";
import "../styles/globals.css";
import "../styles/styles.scss";
import { ThemeContextProvider } from "../context/ThemeCtx";

export default function App({ Component, pageProps }) {
	useEffect(() => {
		analytics(app);
	}, []);

	return (
		<AuthContextProvider>
			<ThemeContextProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ThemeContextProvider>
		</AuthContextProvider>
	);
}
