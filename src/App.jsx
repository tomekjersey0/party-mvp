import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import { AuthModeProvider } from "./contexts/AuthModeContext";

function App() {
  return (
    <AuthModeProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </AuthModeProvider>
  );
}

export default App;
