import React, { useState } from "react";
import { auth, app } from "@/lib/firebase";
import { ref, get, set , getDatabase } from "firebase/database";

export default function Step3_PersonalInfo({ onNext }) {
  const [fullName, setFullName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const userUID = auth.currentUser.uid;
    const db = getDatabase(app);

    const userRef = ref(db, `users/${userUID}`);
    const userData = { fullName };
    set(userRef, userData)
      .then(() => {
        onNext();
      })
      .catch(error => {
        console.error("Error writing user data: ", error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start", // Align items to the top for mobile-first approach
          minHeight: "100vh",
          backgroundColor: "#f1f5f9", // Soft background color
          padding: "2rem 1.5rem", // Padding for content spacing
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "500px", // Prevent the form from being too wide on larger screens
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "2rem", // Larger heading for better visibility
              color: "#333",
              marginBottom: "1.5rem", // Spacing between title and inputs
              fontWeight: "600",
              lineHeight: "1.3",
            }}
          >
            Let's Get to Know You 👋
          </h2>

          <div
            style={{
              marginBottom: "1rem",
              textAlign: "left", // Align labels and inputs to the left
            }}
          >
            <input
              placeholder="Full name"
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "1px solid #ced4da",
                marginBottom: "1rem",
              }}
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
          </div>

          <button
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "14px",
              border: "none",
              borderRadius: "5px",
              fontSize: "1.125rem",
              fontWeight: "500",
              cursor: "pointer",
              width: "100%",
              transition: "background-color 0.3s ease",
            }}
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
