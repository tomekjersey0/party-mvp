import { useState } from "react";
import {
  getAuth,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";

function AuthPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const navigate = useNavigate();

  const actionCodeSettings = {
    url: "https://df011-db.web.app/finishSignUp",
    handleCodeInApp: true,
  };

  // Handle Google Sign-in
  const handleGoogleSignIn = (response) => {
    const credential = GoogleAuthProvider.credential(response.credential);

    signInWithCredential(auth, credential)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User UID: ", user.uid);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log("Error signing in with Google: ", error);
        setErrorMessage("Google Sign-In Failed. Please try again.");
      });
  };

  const handleError = () => {
    console.log("Google Sign-In Failed");
    setErrorMessage("Google Sign-In Failed. Please try again.");
  };

  // Handle email form submission (for sending email link)
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        setInfoMessage("A sign‑in link has been sent to your email.");
      })
      .catch((error) => {
        console.error("Error sending email link: ", error);
        setErrorMessage("Failed to send sign‑in link. Please try again.");
      });
  };

  // Handle email/password sign-in
  const handleEmailPasswordSignIn = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User UID:", user.uid);
        navigate("/dashboard");
      })
      .catch((error) => {
        let errorMessage;
        if (error.code == "auth/invalid-credential") {
          errorMessage = "Error: The email or password you entered is incorrect, or you may need to complete your registration via the link sent to your email";
        } else {
          errorMessage = `Error: ${error}`;
        }
        setErrorMessage(errorMessage);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4">Sign In</h3>

        {errorMessage && (
          <div
            role="alert"
            aria-live="assertive"
            className="alert alert-danger"
          >
            {errorMessage}
          </div>
        )}
        {infoMessage && <div className="alert alert-info">{infoMessage}</div>}

        {/* Show email form or password form */}
        {!showEmailForm && !showPasswordForm ? (
          <>
            <div className="mb-3">
              <GoogleLogin
                onSuccess={handleGoogleSignIn}
                onError={handleError}
                useOneTap
                theme="outline"
                shape="rectangular"
                text="signin_with"
                width="100%"
              />
            </div>

            <div className="text-center">
              <hr />
              <p>Or</p>
              <button
                className="btn btn-secondary w-100 mb-3"
                onClick={() => setShowEmailForm(true)}
              >
                Sign In with Email
              </button>
              <button
                className="btn btn-secondary w-100 mb-3"
                onClick={() => setShowPasswordForm(true)} // Switch to password form
              >
                Sign In with Email/Password
              </button>
            </div>
          </>
        ) : null}

        {/* Show email form */}
        {showEmailForm && (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Send Sign‑in Link
            </button>
            <button
              type="button"
              className="btn btn-link w-100 mt-2"
              onClick={() => setShowEmailForm(false)}
            >
              Back
            </button>
          </form>
        )}

        {/* Show email/password form */}
        {showPasswordForm && (
          <form onSubmit={handleEmailPasswordSignIn}>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Sign In
            </button>
            <button
              type="button"
              className="btn btn-link w-100 mt-2"
              onClick={() => setShowPasswordForm(false)}
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
