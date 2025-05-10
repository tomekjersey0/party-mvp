import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Index from "./pages/Index";
const AuthPage = lazy(() => import("./pages/AuthPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));
import { AuthModeProvider } from "./contexts/AuthModeContext";

function App() {
  return (
    <AuthModeProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/onboarding/*" element={<OnboardingPage />} />
      </Routes>
    </AuthModeProvider>
  );
}

export default App;