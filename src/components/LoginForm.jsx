import { useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../lib/firebase"; // Adjust this import based on your project structure
import FormElement from "./FormElement";
import AuthSubmitSection from "./AuthSubmitSection";
import CryptoJS from "crypto-js";

function hashPassword(password) {
  return CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64); // Example of SHA-256 hashing
}

function isValidPhone(phone) {
  const internationalPattern = /^\+44\d{10}$/; // +44 followed by 10 digits
  const localPattern = /^07\d{9}$/; // 07 followed by 9 digits
  return internationalPattern.test(phone) || localPattern.test(phone);
}

function normalizePhone(phone) {
  const trimmed = phone.trim();
  if (/^07\d{9}$/.test(trimmed)) {
    return "+44" + trimmed.slice(1);
  }
  return trimmed; // Already in +44 format
}

function LoginForm() {
  const [formData, setFormData] = useState({
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

  async function handleSubmit(e) {
    e.preventDefault();
    const db = getDatabase(app);

    const rawPhone = formData.phone.trim();

    if (!isValidPhone(rawPhone)) {
      setError("Please enter a valid UK phone number.");
      return;
    }

    const phone = normalizePhone(rawPhone); // Normalize the phone number
    const phoneRef = ref(db, "userExists/" + phone);
    const userRef = ref(db, "users/" + phone);

    // Check if registered
    const userExistsSnapshot = await get(phoneRef);
    if (!userExistsSnapshot.exists()) {
      setError("Phone number not found.");
      return;
    }

    // Check if verified
    const userExistsData = userExistsSnapshot.val();
    if (!userExistsData.verified) {
      setError("Your account is not verified.")
      return;
    }
    
    // Check the password
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.val();
    const hashedPassword = hashPassword(formData.password);
    if (userData.passwordHash !== hashedPassword) {
      setError("Incorrect password.");
      return;
    }

    // Successful login
    alert("Logged in successfully!");
    // You could redirect the user or manage session here
    console.log("Logged in user:", userData);
  }

  return (
    <form onSubmit={handleSubmit} onChange={handleChange} className="container">
      <FormElement
        name="phone"
        inputPlaceholder="Enter your phone number"
        type="tel"
      ></FormElement>
      <FormElement name="password"></FormElement>
      {error && <div className="alert alert-danger">{error}</div>}
      <AuthSubmitSection text="Login" />
    </form>
  );
}

export default LoginForm;
