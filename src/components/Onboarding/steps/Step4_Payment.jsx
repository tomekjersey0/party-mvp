export default function Step4_Payment({ onNext }) {
    return (
      <div>
        <h2>Buy Your Ticket 🎟️</h2>
        <p>£5 entry – secure your place now.</p>
        <button onClick={onNext}>Pay & Continue</button>
      </div>
    );
  }
  