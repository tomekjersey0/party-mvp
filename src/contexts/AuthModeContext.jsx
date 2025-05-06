// context/AuthModeContext.jsx
import { createContext, useContext, useState } from "react";

const AuthModeContext = createContext();

export function AuthModeProvider({ children }) {
  const [mode, setMode] = useState("signup");

  const toggleMode = () => {
    setMode((prev) => (prev === "signup" ? "login" : "signup"));
  };

  return (
    <AuthModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </AuthModeContext.Provider>
  );
}

// Custom hook for convenience
export function useAuthMode() {
  const context = useContext(AuthModeContext);
  if (!context) throw new Error("useAuthMode must be used within AuthModeProvider");
  return context;
}
