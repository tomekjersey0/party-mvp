import React, { useState, useEffect } from "react";
import { auth, app } from "@/lib/firebase";
import { ref, set, getDatabase } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Step3_PersonalInfo({ onNext }) {
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [userUID, setUserUid] = useState(null);

  // Redirect if not authenticated
    const navigate = useNavigate();
  
    useEffect(() => {
      console.info("hi");
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserUid(user.uid);
        } else {
          navigate("/auth");
        }
      });
  
      return () => unsubscribe();
    }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!fullName.trim()) {
      setError("Full name cannot be empty.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setError("User not authenticated.");
      return;
    }

    const db = getDatabase(app);
    const userRef = ref(db, `users/${userUID}`);
    const userData = { fullName };

    try {
      setSubmitting(true);
      await set(userRef, userData);
      onNext();
    } catch (err) {
      console.error("Error writing user data:", err);
      setError("Failed to save your information. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Let's Get to Know You 👋</h2>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={submitting}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
