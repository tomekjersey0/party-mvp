import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage"
import FinishSignUp from "./components/FinishSignUp";
import { AuthModeProvider } from "./contexts/AuthModeContext";

function App() {
  return (
    <AuthModeProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/finishSignUp" element={<FinishSignUp />} />
        <Route path="/dashboard" element={<DashboardPage />}/>
      </Routes>
    </AuthModeProvider>
  );
}

export default App;
