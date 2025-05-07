export default function Step3_PersonalInfo({ onNext }) {
    return (
      <div>
        <h2>Let’s Get to Know You</h2>
        <input placeholder="Full name" />
        <input placeholder="Age" type="number" />
        <button onClick={onNext}>Continue</button>
      </div>
    );
  }
  