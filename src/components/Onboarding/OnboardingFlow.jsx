import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { onboardingSteps } from "./steps";
import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

function OnboardingFlow() {
  const { stepNumber } = useParams();
  const step = parseInt(stepNumber, 10); // convert string to number
  const navigate = useNavigate();
  const [changeAccountEnabled, setChangeAccountEnabled] = useState(true);
  const CurrentStep = onboardingSteps[step - 1];

  // Send user to the first step if they try to access an invalid step
  useEffect(() => {
    if (isNaN(step) || step < 1 || step > onboardingSteps.length) {
      navigate("/onboarding/1", { replace: true });
    }
  }, [step, navigate]);

  if (!CurrentStep) return null;

  const handleNextStep = () => {
    const nextStep = step + 1;
    if (nextStep > onboardingSteps.length) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate(`/onboarding/${nextStep}`);
    }
  };

  const handleExitToAuth = () => {
    navigate("/auth", { replace: true });
    signOut(auth);  
  };

  return (
    <>
      {step === 1 && changeAccountEnabled && (
        <button
          onClick={handleExitToAuth}
          style={{
            position: "fixed",
            bottom: "10px",
            left: "10px",
            zIndex: 1100,
            padding: "4px 8px",
            background: "transparent",
            color: "#007BFF",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.875rem",
            textDecoration: "underline",
          }}
        >
          Change Account
        </button>
      )}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          minHeight: "100vh",
          padding: "2rem",
          backgroundColor: "#f8f9fa",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              width: "100%",
              maxWidth: "600px",
            }}
          >
            <CurrentStep onNext={handleNextStep} />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default OnboardingFlow;