import { useContext } from "react";
import AuthContext from "../context/AuthCtx";
import { signIn, signOutUser, linkProviderAccount, unlinkAccount } from "../firebase/auth";

export default function Home() {
	const authCtx = useContext(AuthContext);

	return (
		<main>
			Hello {authCtx?.user?.name ?? authCtx?.user?.displayName}!
			{!authCtx?.isAuthorized ? (
				<button
					onClick={async () => {
						await signIn("google.com")
							.then((res) => res)
							.catch((err) => err);
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
				onClick={async () => {
					await signIn("github.com")
						.then((res) => res)
						.catch((err) => err);
				}}>
				Sign In With Github
			</button>
			<button
				onClick={async () => {
					await linkProviderAccount("google.com")
						.then((res) => res)
						.catch((err) => err);
				}}>
				Link Google Account
			</button>
			<button
				onClick={async () => {
					await linkProviderAccount("github.com")
						.then((res) => res)
						.catch((err) => err);
				}}>
				Link Github Account
			</button>
			<button
				onClick={async () => {
					await unlinkAccount("google.com");
				}}>
				Unlink Github Account
			</button>
			<button
				onClick={async () => {
					await unlinkAccount("github.com");
				}}>
				Unlink Github Account
			</button>
		</main>
	);
}
