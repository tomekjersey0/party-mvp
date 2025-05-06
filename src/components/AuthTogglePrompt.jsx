import { useAuthMode } from "../contexts/AuthModeContext";

function AuthTogglePrompt() {
    const { mode , setMode } = useAuthMode();

    return (
        <div>
        {mode === "signup"
          ? "Already have an account?"
          : "Don't have an account?"}{" "}
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => setMode(mode === "signup" ? "login" : "signup")}
        >
          {mode === "signup" ? "Log In" : "Sign Up"}
        </button>
      </div>
    );
}

export default AuthTogglePrompt;