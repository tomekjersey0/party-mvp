import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage"
import OnboardingPage from "./pages/OnboardingPage"
import FinishSignUpPage from "./pages/FinishSignUpPage";
import { AuthModeProvider } from "./contexts/AuthModeContext";

function App() {
  return (
    <AuthModeProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/finishSignUp" element={<FinishSignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />}/>
        <Route path="/onboarding" element={<OnboardingPage />}/>
      </Routes>
    </AuthModeProvider>
  );
}

export default App;
