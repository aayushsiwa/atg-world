// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    GithubAuthProvider,
    updateProfile,
    onAuthStateChanged,
    updateEmail,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: "atg-world-275f7",
    storageBucket: "atg-world-275f7.appspot.com", // Remove .firebasestorage.app
    messagingSenderId: "501833830562",
    appId: "1:501833830562:web:90a2223012786c12a447fb",
    measurementId: "G-15NG3T2T7V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const storage = getStorage(app);

// Sign In
export const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

// Sign Up
export const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Sign Out
export const logOut = () => signOut(auth);

export { auth, onAuthStateChanged, storage };

export const updateUserProfile = async (
    user,
    displayName: string,
    photoURL: string
) => {
    try {
        await updateProfile(user, {
            displayName,
            photoURL,
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};

export const updateUserEmail = async (user, email: string) => {
    try {
        await updateEmail(user, email);
    } catch (error) {
        console.error("Error updating email:", error);
        throw error;
    }
};
