import React from "react";

export default function Step1_Welcome({ onNext }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // Align items to the top
        minHeight: "100vh",
        backgroundColor: "#f1f5f9", // Soft background color
        padding: "2rem 1.5rem", // Increase top padding to move content higher up
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px", // Ensure content doesn't stretch too wide on larger screens
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2rem", // Larger font size for the title
            color: "#333",
            marginBottom: "1.5rem", // Increase space below the heading
            fontWeight: "600",
            lineHeight: "1.3",
          }}
        >
          🎉 Welcome to the Party App
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "#6c757d",
            marginBottom: "2rem", // Adjusted margin for breathing space
            lineHeight: "1.5",
          }}
        >
          This app helps you manage your tickets, drinks, and more. Ready to get
          started and have fun?
        </p>
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
          Get Started
        </button>
      </div>
    </div>
  );
}
