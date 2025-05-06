import { useState } from "react";
import { getDatabase, ref, set, get } from "firebase/database"; // Import Firebase methods
import { app } from "../lib/firebase"; // Import your Firebase app setup
import FormElement from "./FormElement"; // Assuming FormElement is a custom component
import AuthTogglePrompt from "./AuthTogglePrompt";
import AuthSubmitSection from "./AuthSubmitSection";

// Validate UK phone number formats (international and local)
function isValidPhone(phone) {
  const internationalPattern = /^\+44\d{10}$/; // +44 followed by 10 digits
  const localPattern = /^07\d{9}$/; // 07 followed by 9 digits
  return internationalPattern.test(phone) || localPattern.test(phone);
}

// Normalize phone number to international format
function normalizePhone(phone) {
  const trimmed = phone.trim();
  if (/^07\d{9}$/.test(trimmed)) {
    return "+44" + trimmed.slice(1); // Convert local to international
  }
  return trimmed; // Already in +44 format
}

function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    const db = getDatabase(app);

    const rawPhone = formData.phone.trim();

    // Validate phone number
    if (!isValidPhone(rawPhone)) {
      setError("Please enter a valid UK phone number.");
      return;
    }

    const phone = normalizePhone(rawPhone); // Normalize phone to international format

    const userRef = ref(db, "users/" + phone);
    const snapshot = await get(userRef);

    // Check if phone is already registered
    if (snapshot.exists()) {
      setError("Phone number already registered.");
    } else {
      // Save user to the database
      await set(userRef, {
        name: formData.name,
        password: formData.password,
      });
      alert("User registered!");
    }

    console.log(formData); // Debugging
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        className="container"
      >
        <FormElement name="name" />
        <FormElement
          name="phone"
          inputPlaceholder="Enter your phone number"
          type="tel"
        />
        <FormElement name="password" type="password" />
        {error && <div className="alert alert-danger">{error}</div>}
        <AuthSubmitSection text="Sign Up" />
      </form>
    </div>
  );
}

export default SignUpForm;
