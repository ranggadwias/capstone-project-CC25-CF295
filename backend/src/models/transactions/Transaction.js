import { collection, addDoc } from "firebase/firestore";
import db from "../../config/firebase.js";

const transactionsCollection = collection(db, "transactions");

export const addTransactionModel = async (data) => {
  const docRef = await addDoc(transactionsCollection, data);
  return docRef.id;
};