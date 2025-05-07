// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBU8K8wEewsSdOF2C8K2O5Z0nSUgESbntQ",
    authDomain: "df011-db.firebaseapp.com",
    databaseURL: "https://df011-db-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "df011-db",
    storageBucket: "df011-db.firebasestorage.app",
    messagingSenderId: "736880728126",
    appId: "1:736880728126:web:097b62884b404c609cd96f",
    measurementId: "G-HSBFVX0C0P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {app, analytics, auth, provider};