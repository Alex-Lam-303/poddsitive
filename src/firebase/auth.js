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

// Function to sign in with Google
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User signed in with Google:", user);
    return user; // Return user info if needed
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Function to sign in with Facebook
export const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User signed in with Facebook:", user);
    return user; // Return user info if needed
  } catch (error) {
    console.error("Error signing in with Facebook:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Function to sign in with Apple
export const signInWithApple = async () => {
  const provider = new OAuthProvider("apple.com");
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User signed in with Apple:", user);
    return user; // Return user info if needed
  } catch (error) {
    console.error("Error signing in with Apple:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Function to sign up with email and password
export const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User signed up with email:", user);
    return user; // Return user info if needed
  } catch (error) {
    console.error("Error signing up with email:", error);
    throw error; // Rethrow the error for handling in the component
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
    return user; // Return user info if needed
  } catch (error) {
    console.error("Error logging in with email:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Function to send password reset email
export const sendResetEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent to:", email);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Function to log out
export const logoutOfPoddsitive = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully.");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
