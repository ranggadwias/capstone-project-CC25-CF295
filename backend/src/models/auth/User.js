import { collection, addDoc, getDocs, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../../config/firebase.js";

const usersCollection = collection(db, "users");

export const findUserByEmail = async (email) => {
  const q = query(usersCollection, where("email", "==", email));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};

export const createUser = async ({ name, email, password, isGoogleUser = false, phone = "", address = "" }) => {
  const docRef = await addDoc(usersCollection, {
    name,
    email,
    password,
    isGoogleUser,
    phone,
    address,
  });

  const userSnap = await getDoc(docRef);
  return { id: docRef.id, ...userSnap.data() };
};


export const getUserById = async (userId) => {
  const docRef = doc(db, "users", userId);
  const userSnap = await getDoc(docRef);
  if (!userSnap.exists()) return null;
  return { id: userSnap.id, ...userSnap.data() };
};

export const updateUserById = async (userId, data) => {
  const docRef = doc(db, "users", userId);
  await updateDoc(docRef, data);
};

export const updateUserNameInTransactions = async (userId, newUserName) => {
  const transactionsRef = collection(db, "transactions");
  const q = query(transactionsRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  const updatePromises = querySnapshot.docs.map(docSnapshot => {
    const docRef = doc(db, "transactions", docSnapshot.id);
    return updateDoc(docRef, {
      userName: newUserName,
    });
  });

  return Promise.all(updatePromises)
    .then(() => true)
    .catch((error) => {
      console.error("Error updating userName in transactions:", error);
      throw error;
    });
};