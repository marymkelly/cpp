import { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthCtx";
import { signIn, signOutUser, linkProviderAccount, unlinkAccount } from "../firebase/auth";
import SagaUpdated, { SagaLogoBlack } from "../components/assets/logo/SagaUpdated";

export default function Home() {
	const router = useRouter();
	const authCtx = useContext(AuthContext);
	const [error, setError] = useState();

	const [theme, setTheme] = useState('dark');

	useEffect(() => {
		const deviceTheme = window.matchMedia("(prefers-color-scheme:light)");
		function handleChange(e) {
			e.matches ? setTheme("light") : setTheme("dark");
		}

		deviceTheme.addEventListener("change", handleChange);

		return () => {
			deviceTheme.removeEventListener("change", handleChange);
		};
	}, [theme]);

	return (
		<main className='login-page'>
			{/* <div className='logo-container'></div> */}
			<div className='login-container'>
				<div className='login-logo'>
					<SagaLogoBlack theme={theme} className='login-logo__logo' />
				</div>
				<div className="login-content">
					<h1 className='login-title'>Sign in</h1>
					<div className='login-btn-container'>
						{authCtx?.user?.displayName}
						{!authCtx?.isAuthorized ? (
							<>
								<button
									onClick={async () => {
										await signIn("google.com")
											.then(() => {
												router.push("/dashboard");
											})
											.catch((err) => {
												setError(err.message);
												return err.message;
											});
									}}>
									<div className="google-logo"></div>
									Sign In with Google
								</button>
								<button
									onClick={async () => {
										await signIn("github.com")
											.then(() => {
												router.push("/dashboard");
											})
											.catch((err) => {
												setError(err.message);
												return err.message;
											});
									}}>
									<div className="github-logo"></div>
									Sign In With GitHub
								</button>
							</>
						) : (
							<button
								onClick={async () => {
									signOutUser();
								}}>
								Sign Out
							</button>
						)}
						{error && (
							<div>
								<p className='error'>{error} </p>
								<button
									onClick={() => {
										setError();
									}}>
									Clear Me
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="login-design-container">
				<div className="design-content">
					<div className="design-text">
						<p className="header-top">Practical project management...</p>
						<p className="header-bottom">...More about something tagline</p>
					</div>
					<div className="design-img"></div>
				</div>
			</div>
		</main>
	);
}
