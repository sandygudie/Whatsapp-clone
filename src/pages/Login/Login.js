import { Button } from "@material-ui/core";
import "./Login.css";
import { auth, provider } from "../../firebase";
import SplashScreen from "../../components/loader/SplashScreen"

export default function Login() {
  
  function login() {
    try {
      auth.signInWithRedirect(provider)
      localStorage.setItem("firebaseAuthKey", "1");
    } catch (err) {
      console.log(err);
      localStorage.removeItem("firebaseAuthKey");
    }
  }

  if (localStorage.getItem("firebaseAuthKey") === "1") return <SplashScreen />;
  return (
    <div className="app">
      <div className="login">
        <div className="login__container">
          <img src="./login-logo.png" alt="Logo" />
          <div className="login__text">
            <h1>Sign in to WhatsApp</h1>
          </div>
          <Button onClick={login}>Sign in with Google</Button>
        </div>
      </div>
    </div>
  );
}
