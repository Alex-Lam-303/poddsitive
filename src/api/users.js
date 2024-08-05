import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();

export const createUserInFirestore = async (email) => {
  try {
    const userRef = doc(db, "users.v1", email);
    await setDoc(userRef, {
      email,
      createdAt: serverTimestamp(),
      fetchCount: 0,
      token: "",
    });
    console.log("User created in Firestore:", email);
  } catch (error) {
    console.error("Error creating user in Firestore:", error);
    throw error;
  }
};

export const saveUserAPIKey = async (apiKey) => {
  const user = getUser();
  const userRef = doc(db, "users.v1", user.email);
  await updateDoc(userRef, { token: apiKey });
};

export const getUserAPIKey = async () => {
  console.log("Getting user API key");
  const user = getUser();
  const userRef = doc(db, "users.v1", user.email);
  const userDoc = await getDoc(userRef);
  return userDoc.data().token;
};

const getUser = () => {
  const auth = getAuth();
  return auth.currentUser;
};
