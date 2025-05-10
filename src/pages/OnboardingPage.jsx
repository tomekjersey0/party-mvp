import { Routes, Route } from "react-router-dom";
import OnboardingFlow from "../components/Onboarding/OnboardingFlow";

function OnboardingPage() {
  return (
    <Routes>
      <Route path=":stepNumber" element={<OnboardingFlow />} />
      <Route path="*" element={<p>No matching onboarding step.</p>} />
    </Routes>
  );
}

export default OnboardingPage;