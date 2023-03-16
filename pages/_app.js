import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import Notification from "../components/Notification";
import { AuthContextProvider } from "../context/AuthCtx";
import { app, analytics } from "../firebase/firebase";
import "normalize.css";
import "../styles/globals.css";
import "../styles/styles.scss";
import { ThemeContextProvider } from "../context/ThemeCtx";
import { ProjectContextProvider } from "../context/ProjectCtx";
import NotificationContext, { NotificationContextProvider } from "../context/NotificationCtx";

export default function App({ Component, pageProps }) {
	useEffect(() => {
		analytics(app);
	}, []);

	return (
		<ProjectContextProvider>
			<AuthContextProvider>
				<ThemeContextProvider>
					<NotificationContextProvider>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</NotificationContextProvider>
				</ThemeContextProvider>
			</AuthContextProvider>
		</ProjectContextProvider>
	);
}
