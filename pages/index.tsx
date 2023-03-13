import { useContext, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthCtx";
import { signIn, signOutUser } from "../firebase/auth";
import SagaUpdated from "../components/assets/logo/SagaUpdated";
import { useTheme } from "../lib/hooks/hooks";

export default function Home() {
	const router = useRouter();
	const authCtx = useContext(AuthContext);
	const [error, setError] = useState();
	const theme = useTheme();

	return (
		<section className='login-page'>
			<div className='login-logo'>
				<SagaUpdated theme={theme} className='login-logo__logo' />
			</div>
			<div className='login-container'>
				<h1 className='login-title'>LOGIN</h1>
				<div className='login-btn-container'>
					{authCtx?.user?.displayName}
					{!authCtx?.isAuthorized ? (
						<>
							<button
								onClick={async () => {
									authCtx.setLoading(true);

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
								Sign In with Google
							</button>
							<button
								onClick={async () => {
									authCtx.setLoading(true);

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
		</section>
	);
}
