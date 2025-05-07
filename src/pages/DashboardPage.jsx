import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

function DashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Not logged in — redirect to sign-in page
        navigate("/auth");
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard.</p>
    </div>
  );
}

export default DashboardPage;
