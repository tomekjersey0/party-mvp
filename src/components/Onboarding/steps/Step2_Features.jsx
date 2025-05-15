import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Step2_Features({ onNext }) {
  // Redirect if not authenticated
  const navigate = useNavigate();

  useEffect(() => {
    console.info("hi");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/auth");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <div>
        <h2>What This App Does</h2>
        <ul>
          <li>🍹 Register alcohol</li>
          <li>📊 Track shot limits</li>
          <li>🤝 Share drinks with friends</li>
        </ul>
        <button onClick={onNext}>Continue</button>
      </div>
    </div>
  );
}
