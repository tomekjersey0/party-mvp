export default function Step6_Success({ onNext }) {
    return (
      <div>
        <h2>You're All Set!</h2>
        <p>Your QR code will be shown on the dashboard. See you at the party!</p>
        <button onClick={onNext}>Go to Dashboard</button>
      </div>
    );
  }
  