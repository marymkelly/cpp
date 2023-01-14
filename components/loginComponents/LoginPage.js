import { useContext } from "react";
import AuthContext from "../../context/AuthCtx";
import { signInWithGooglePopup, signOutUser } from "../../firebase/auth";
import LoginResult from "./LoginResult";

export default function LoginPage() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);

  return (
    <div className="login-page">
      <LoginResult />
      <div className="login-container">
        <h1 className="login-title">LOGIN</h1>
        <div className="login-btn-container">
          {authCtx?.user?.displayName}
          {!authCtx?.isAuthorized ? (
            <button 
              onClick={() => {
                signInWithGooglePopup();
                document.querySelector('.login-result-title').innerHTML = "Connecting to Google"
                document.querySelector('.login-result-message').innerHTML = ""
                document.querySelector(".login-result").classList.remove("hide")
              }}
            >
              Sign In with Google
            </button>
          ) : (
            <button
              onClick={async() => {
            	signOutUser();
              document.querySelector('.login-result-title').innerHTML = "Signed Out"
              document.querySelector('.login-result-message').innerHTML = "Your account has been signed out."
              document.querySelector(".login-result").classList.toggle("hide")  
              }}

            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
