import { useAuthMode } from "../contexts/AuthModeContext";

function AuthHeader() {
    const { mode , setMode} = useAuthMode();

  return (
    <div className="container mt-5">
      <h1>{mode === "signup" ? "Sign Up" : "Log In"}</h1>

      <div className="btn-group mb-3">
        <button
          className={`btn btn-outline-primary ${
            mode === "signup" ? "active" : ""
          }`}
          onClick={() => setMode("signup")}
        >
          Sign Up
        </button>
        <button
          className={`btn btn-outline-secondary ${
            mode === "login" ? "active" : ""
          }`}
          onClick={() => setMode("login")}
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export default AuthHeader;
