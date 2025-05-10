import { useEffect, useRef, useState } from "react";
import { auth } from "../lib/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInAnonymously,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showAnonLogin, setShowAnonLogin] = useState(false);
  const [showInputPhoneNumber, setShowInputPhoneNumber] = useState(true);
  const recaptchaVerifierRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {},
          "expired-callback": () => {
            setErrorMessage("reCAPTCHA expired, please try again.");
          },
        }
      );
    }
  }, []);

  // Handle anonymous login
  const handleAnonymousLogin = async () => {
    try {
      await signInAnonymously(auth);
      setIsAnonymous(true);
      setInfoMessage("Signed in anonymously!");
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message || "Failed to sign in anonymously.");
    }
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setInfoMessage("");

    if (!phoneNumber) {
      setErrorMessage("Phone number is required.");
      return;
    }

    try {
      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifierRef.current
      );
      setConfirmationResult(result);
      setInfoMessage("Verification code sent!");
      setShowInputPhoneNumber(false);
    } catch (error) {
      setErrorMessage(error.message || "Failed to send code.");
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setInfoMessage("");

    if (!verificationCode) {
      setErrorMessage("Verification code is required.");
      return;
    }

    try {
      await confirmationResult.confirm(verificationCode);
      setInfoMessage("Successfully signed in!");
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Invalid verification code.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="position-absolute top-0 end-0 p-3">
        <button
          onClick={() => setShowAnonLogin((prev) => !prev)}
          className="btn btn-link text-decoration-none"
        >
          {showAnonLogin ? "Hide Anonymous Login" : "Show Anonymous Login"}
        </button>
      </div>
      <div
        className="card p-4 shadow border-0"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <div className="mb-4 text-center">
          <h2 className="fw-bold">Sign In</h2>
          {showInputPhoneNumber && (
            <p className="text-muted small">
              Enter your phone number to receive a verification code, or sign in
              anonymously.
            </p>
          )}
        </div>

        {errorMessage && (
          <div
            role="alert"
            aria-live="assertive"
            className="alert alert-danger"
          >
            {errorMessage}
          </div>
        )}
        {infoMessage && <div className="alert alert-info">{infoMessage}</div>}

        {/* Option to sign in anonymously */}
        {!isAnonymous && showAnonLogin && (
          <div className="mb-3 text-center">
            <button
              onClick={handleAnonymousLogin}
              className="btn btn-outline-secondary btn-lg px-4 py-2 fw-bold shadow-sm"
              style={{ borderRadius: "30px" }}
            >
              Sign In Anonymously
            </button>
          </div>
        )}

        <form onSubmit={confirmationResult ? handleVerifyCode : handleSendCode}>
          {/* Phone input */}
          {showInputPhoneNumber && (
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                placeholder="+1 555 123 4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={!!confirmationResult || isAnonymous}
                required
              />
              <div className="form-text">
                Include your country code, e.g., +44 for UK.
              </div>
            </div>
          )}

          {/* OTP input */}
          {confirmationResult && (
            <div className="mb-3">
              <label htmlFor="code" className="form-label">
                Verification Code
              </label>
              <div className="d-flex justify-content-between">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="form-control text-center mx-1"
                    style={{ width: "40px", fontSize: "1.5rem" }}
                    value={verificationCode[index] || ""}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, ""); // Allow numbers only
                      const newCode = verificationCode.split("");
                      newCode[index] = value;
                      setVerificationCode(newCode.join(""));
                      // Automatically move to the next input
                      if (value && e.target.nextSibling) {
                        e.target.nextSibling.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                        const newCode = verificationCode.split("");
                        newCode[index] = ""; // Clear the current input
                        setVerificationCode(newCode.join(""));
                        // Move to the previous input if empty
                        if (
                          !verificationCode[index] &&
                          e.target.previousSibling
                        ) {
                          e.target.previousSibling.focus();
                        }
                      }
                    }}
                    required
                  />
                ))}
              </div>
            </div>
          )}

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              {confirmationResult ? "Verify Code" : "Send Code"}
            </button>
          </div>
        </form>

        <div id="recaptcha-container"></div>

        {/* Optional footer */}
        <div className="mt-4 text-center">
          <small className="text-muted">
            Your number is never shared. Standard SMS rates may apply.
          </small>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
