import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { app, auth } from "./firebase";

function signInWithGooglePopup() {
	const auth = getAuth(app);
	const provider = new GoogleAuthProvider();

	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;
			// i've left in console.log for now just to easily illustrate what's happening when
			console.log("SIGNED IN", user, token);
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);

			document.querySelector(".login-result-title").innerHTML = "Error, Try Agin";
			document.querySelector(".login-result-message").innerHTML = "Something went wrong trying to connecet your Google account.";

			// i've left in console.log for now just to easily illustrate what's happening when
			console.log("ERROR", error, credential);
		});
}

async function authStateListener(cb) {
	onAuthStateChanged(auth, cb);
}

async function signOutUser() {
	try {
		return await signOut(auth);
	} catch (error) {
		return { error };
	}
}

export { signInWithGooglePopup, authStateListener, signOutUser };
