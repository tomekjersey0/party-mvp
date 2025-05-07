export default function Step2_Features({ onNext }) {
    return (
      <div>
        <h2>What This App Does</h2>
        <ul>
          <li>Register alcohol</li>
          <li>Track shot limits</li>
          <li>Share drinks with friends</li>
        </ul>
        <button onClick={onNext}>Next</button>
      </div>
    );
  }
  