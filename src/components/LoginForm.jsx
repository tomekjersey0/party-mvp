import { useState } from "react";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const auth = getAuth();

  // This configuration must match settings in the Firebase console.
  const actionCodeSettings = {
    // URL you want to redirect back to. This can be a route in your app.
    url: "https://df011-db.web.app/finishSignUp",
    handleCodeInApp: true,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        // Optional: save email locally so you can complete sign in
        window.localStorage.setItem("emailForSignIn", email);
        setMessage("A sign‑in link has been sent to your email.");
      })
      .catch((error) => {
        console.error("Error sending email link", error);
        setMessage("Error sending sign‑in link. Please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Send Sign‑in Link
      </button>
      {message && <div className="mt-2 alert alert-info">{message}</div>}
    </form>
  );
}

export default LoginForm;
