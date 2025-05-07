import { useState } from "react";
import { onboardingSteps } from "./steps";

function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const CurrentStep = onboardingSteps[step];

  // Optional: fallback if user somehow goes past last step
  if (!CurrentStep) return <p>Finished onboarding!</p>;

  return <CurrentStep onNext={() => setStep(step + 1)} />;
}

export default OnboardingFlow;
