import { useContext, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthCtx";
import { signIn, signOutUser } from "../firebase/auth";
import SagaUpdated from "../components/assets/logo/SagaUpdated";
// import { useTheme } from "../lib/hooks/hooks";

export default function Home() {
	const router = useRouter();
	const authCtx = useContext(AuthContext);
	const [error, setError] = useState();
	// const theme = useTheme();

	return (
		<main className='login-page'>
			<div className='login-container'>
				<div className='login-logo'>
					<SagaUpdated theme="light" className='login-logo__logo' />
				</div>
				<div className='login-content'>
					<h1 className='login-title'>Sign in</h1>
					<div className='login-btn-container'>
						{authCtx?.user?.displayName}
						{!authCtx?.isAuthorized ? (
							<>
								<button
									onClick={async () => {
										await signIn("google.com")
											.then((data) => {
												if (data?.user) {
													authCtx.setUser({
														id: data.user.id,
														profile: data.user.profile,
													});
												}

												router.push("/dashboard");
											})
											.catch((err) => {
												setError(err.message);
												return err.message;
											});
									}}>
									<div className='google-logo'></div>
									Sign In with Google
								</button>
								<button
									onClick={async () => {
										await signIn("github.com")
											.then((data) => {
												if (data?.user) {
													authCtx.setUser({
														id: data.user.id,
														profile: data.user.profile,
													});
												}

												router.push("/dashboard");
											})
											.catch((err) => {
												setError(err.message);
												return err.message;
											});
									}}>
									<div className='github-logo'></div>
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
										setError(null);
									}}>
									Clear Me
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className='login-design-container'>
				<div className='design-content'>
					<div className='design-text'>
						<p className='header-top'>Practical project management...</p>
						<p className='header-bottom'>...More about something tagline</p>
					</div>
					<div className='design-img'></div>
				</div>
			</div>
		</main>
	);
}
