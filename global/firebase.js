// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDP8ygSOzXzFq30cQXdxcRYFKJKFRRRS3w",
  authDomain: "buildapc-szakdolgozat.firebaseapp.com",
  databaseURL:
    "https://buildapc-szakdolgozat-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "buildapc-szakdolgozat",
  storageBucket: "buildapc-szakdolgozat.appspot.com",
  messagingSenderId: "335299907712",
  appId: "1:335299907712:web:06680c9aebce895c901665",
  measurementId: "G-8ZHBHZF2M1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { auth };

// set(ref(getDatabase(), "DATABASE_ROOT/proba"), {
//     a: `${new Date().getMinutes()}`,
//   });
