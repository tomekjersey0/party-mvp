import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Step1_Welcome({ onNext }) {
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
        <h2>🎉 Welcome to the Party App</h2>
        <p>
          This app helps you manage your tickets, drinks, and more. Ready to get
          started and have fun?
        </p>
        <button onClick={onNext}>Get Started</button>
      </div>
    </div>
  );
}
