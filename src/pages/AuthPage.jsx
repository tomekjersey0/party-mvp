import { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import AuthHeader from "../components/AuthHeader";
import { useAuthMode } from "../contexts/AuthModeContext";

function AuthPage() {
  const { mode } = useAuthMode();

  return (
    <div>
      <AuthHeader></AuthHeader>
      {mode === "signup" ? <SignUpForm /> : <LoginForm />}
    </div>
  );
}

export default AuthPage;
