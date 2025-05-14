import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, app } from "../lib/firebase";
import { ref, get, getDatabase } from "firebase/database";

function DashboardPage() {
  const navigate = useNavigate();
  const [userUid, setUserUid] = useState(null);
  const [checkingUser, setCheckingUser] = useState(true);
  const [fullName, setFullName] = useState("");
  const [infoBox, setInfoBox] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
      } else {
        navigate("/auth");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Check if user has completed onboarding
  useEffect(() => {
    if (!userUid) return;

    const checkUserExists = async () => {
      const db = getDatabase(app);
      const userRef = ref(db, "users/" + userUid);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        navigate("/onboarding/step-1", { state: { fromAuth: true } });
      } else {
        const userData = snapshot.val();
        setFullName(userData.fullName);
        setCheckingUser(false);
      }
    };

    checkUserExists();
  }, [userUid, navigate]);

  if (checkingUser) {
    return <p>Loading...</p>; // or a loading spinner
  }

  function handleSignOut() {
    signOut(auth).then(() => {
      //
    });
  }

  return (
    <div className="position-relative" style={{height: "100vh"}}>
      {infoBox && <div className="alert alert-info">asd</div>}
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard, {fullName}!</p>
      
    </div>
  );
}

export default DashboardPage;
