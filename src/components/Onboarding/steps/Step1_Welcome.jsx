export default function Step1_Welcome({ onNext }) {
    return (
      <div>
        <h2>Welcome to the Party App 🎉</h2>
        <p>This app manages tickets, drinks, and more. Let's get started.</p>
        <button onClick={onNext}>Next</button>
      </div>
    );
  }
  