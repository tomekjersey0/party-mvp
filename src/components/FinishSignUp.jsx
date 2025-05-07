import { useEffect, useState } from "react";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
  updatePassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function FinishSignUpPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const email = window.localStorage.getItem("emailForSignIn");

    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Complete sign-in with email link.
      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          window.localStorage.removeItem("emailForSignIn");
        })
        .catch((error) => {
          console.error("Error completing sign-in with email link", error);
          setError("Error signing in with the link. Please try again.");
        });
    }
  }, [auth]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      // If the user is authenticated, update the password
      updatePassword(user, password)
        .then(() => {
          setSuccessMessage("Password updated successfully!");
          setIsPasswordSet(true);
          // Redirect to the dashboard or home page after successful password update
          navigate("/dashboard");
        })
        .catch((error) => {
          setError("Failed to update password. Please try again.");
          console.error("Error updating password: ", error);
        });
    } else {
      // If no user is authenticated, show an error message
      setError("No user is currently signed in. Please sign in first.");
      console.error("Error: No authenticated user found.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4">Finish Sign-Up</h3>

        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        {!isPasswordSet ? (
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Set a Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Set Password
            </button>
          </form>
        ) : (
          <div>Redirecting to your dashboard...</div>
        )}
      </div>
    </div>
  );
}

export default FinishSignUpPage;
