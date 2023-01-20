import { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthCtx";
import { signIn, signOutUser, linkProviderAccount, unlinkAccount } from "../firebase/auth";

export default function Home() {
	const router = useRouter();
	const authCtx = useContext(AuthContext);
	const [error, setError] = useState();

	// useEffect(() => {
	// 	console.log("ERROR", error);
	// }, [error]);

	return (
		<div>
			Hello {authCtx?.user?.name ?? authCtx?.user?.displayName}!
			{!authCtx?.isAuthorized ? (
				<button
					onClick={async () => {
						let result = await signIn("google.com")
							.then(() => {
								router.push("/dashboard");
							})
							.catch((err) => {
								setError(err.message);
								return err.message;
							});
					}}>
					Sign In with Google
				</button>
			) : (
				<button
					onClick={() => {
						signOutUser();
						router.push("/");
					}}>
					Sign Out
				</button>
			)}
			<button
				onClick={async () => {
					let result = await signIn("github.com")
						.then(() => {
							router.push("/dashboard");
						})
						.catch((err) => err);
				}}>
				Sign In With Github
			</button>
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
	);
}
