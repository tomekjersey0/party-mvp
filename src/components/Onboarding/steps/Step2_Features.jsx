import React from "react";

export default function Step2_Features({ onNext }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // Align items to the top for mobile-first approach
        minHeight: "100vh",
        backgroundColor: "#f1f5f9", // Soft background color for the overall page
        padding: "2rem 1.5rem", // Padding to keep content from touching edges
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px", // Ensures content doesn't stretch too wide on larger screens
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2rem", // Larger heading for better visibility
            color: "#333",
            marginBottom: "1.5rem", // Spacing between title and list
            fontWeight: "600",
            lineHeight: "1.3",
          }}
        >
          What This App Does
        </h2>

        <ul
          style={{
            textAlign: "left", // Align text to the left for better readability
            marginBottom: "2rem", // Add spacing below the list
            paddingLeft: "20px", // Add padding to indent list items
            color: "#6c757d", // Subtle gray color for list text
            fontSize: "1rem", // Slightly smaller font size for list items
          }}
        >
          <li>🍹 Register alcohol</li>
          <li>📊 Track shot limits</li>
          <li>🤝 Share drinks with friends</li>
        </ul>

        <button
          onClick={onNext}
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
        >
          Continue
        </button>
      </div>
    </div>
  );
}
