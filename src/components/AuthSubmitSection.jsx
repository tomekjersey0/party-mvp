import AuthTogglePrompt from "./AuthTogglePrompt";

function AuthSubmitSection({ text }) {

  return (
    <div className="d-flex justify-content-between align-items-center">
      <button className="btn btn-primary" type="submit">
        {text}
      </button>
      <AuthTogglePrompt></AuthTogglePrompt>
    </div>
  );
}

export default AuthSubmitSection;