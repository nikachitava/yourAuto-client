import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCPUT65hnCV70Ymu32m355yTwu30cAbP0U",
  authDomain: "yourauto-31496.firebaseapp.com",
  projectId: "yourauto-31496",
  storageBucket: "yourauto-31496.firebasestorage.app",
  messagingSenderId: "873198325479",
  appId: "1:873198325479:web:aa195efc967adb1b209c42"
};

const app = initializeApp(firebaseConfig);
export const uploadImageToFirebaseStorage = getStorage(app)
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

//project id for google auth project-873198325479