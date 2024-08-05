import {
  auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from "./firebase";
import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { createUserInFirestore } from "../api/users";

export const signUpPoddsitive = async (type, email = null, password = null) => {
  try {
    if (type === "email") {
      const signUp = await signUpWithEmailAndPassword(email, password);
      createUserInFirestore(email);
      return signUp;
    }
    if (type === "google") {
      return await signUpWithGoogle();
    } else if (type === "facebook") {
      return await signUpWithFacebook();
    } else if (type === "apple") {
      return await signUpWithApple();
    }
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error("User already exists. Please sign in.");
    } else {
      throw error;
    }
  }
};

// Function to log in with email and password
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error;
  }
};

// Function to send password reset email
export const sendResetEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

// Function to log out
export const logoutOfPoddsitive = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Function to sign in with Google
const signUpWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

// Function to sign in with Facebook
const signUpWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User signed in with Facebook:", user);
    return user;
  } catch (error) {
    console.error("Error signing in with Facebook:", error);
    throw error;
  }
};

// Function to sign in with Apple
const signUpWithApple = async () => {
  const provider = new OAuthProvider("apple.com");
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    throw error;
  }
};

// Function to sign up with email and password
const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error;
  }
};
