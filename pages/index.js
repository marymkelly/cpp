import { useContext } from "react";
import AuthContext from "../context/AuthCtx";
import { signInWithGooglePopup, signOutUser } from "../firebase/auth";

export default function Home() {
	const authCtx = useContext(AuthContext);
	console.log(authCtx);

	return (
		<main>
			Hello {authCtx?.user?.displayName} !
			{!authCtx?.isAuthorized ? (
				<button
					onClick={() => {
						signInWithGooglePopup();
					}}>
					Sign In with Google
				</button>
			) : (
				<button
					onClick={() => {
						signOutUser();
					}}>
					Sign Out
				</button>
			)}
			<button
				onClick={async (e) => {
					console.log("CLICKED", e);
					let response = await fetch("/api/hello")
						.then((res) => res.json())
						.then((res) => res);

					console.log("response: ", response);
				}}>
				Example click to api route
			</button>
		</main>
	);
}
