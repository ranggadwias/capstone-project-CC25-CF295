import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import db from "../../config/firebase.js";

const usersCollection = collection(db, "users");

export const findUserByEmail = async (email) => {
  const q = query(usersCollection, where("email", "==", email));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};

export const createUser = async ({ name, email, password }) => {
  const docRef = await addDoc(usersCollection, { name, email, password });
  return { id: docRef.id };
};
