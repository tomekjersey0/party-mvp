import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { onboardingSteps } from "./steps";
import { AnimatePresence, motion } from "framer-motion";

function OnboardingFlow() {
  const { stepNumber } = useParams();
  const navigate = useNavigate();
  const [direction, setDirection] = useState(1);
  const prevStepRef = useRef(null);

  const step = parseInt(stepNumber ?? "1", 10) - 1;
  const CurrentStep = onboardingSteps[step];

  // Update direction before paint for smooth transitions.
  useLayoutEffect(() => {
    if (prevStepRef.current !== null) {
      if (step < prevStepRef.current) {
        setDirection(-1);
      } else {
        setDirection(1);
      }
    }
    prevStepRef.current = step;
  }, [step]);

  useEffect(() => {
    if (step < 0 || step >= onboardingSteps.length || isNaN(step)) {
      navigate("/onboarding/1", { replace: true });
    }
  }, [step, navigate]);

  if (!CurrentStep) return null;

  const handleNextStep = () => {
    const nextStep = step + 2;
    if (nextStep > onboardingSteps.length) {
      navigate("/onboarding/complete", { replace: true });
    } else {
      navigate(`/onboarding/${nextStep}`);
    }
  };

  const handleExitToAuth = () => {
    navigate("/auth", { replace: true });
  };

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <>
      {step === 0 && (
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
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          minHeight: "300px",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ position: "absolute", width: "100%" }}
          >
            <CurrentStep onNext={handleNextStep} />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default OnboardingFlow;