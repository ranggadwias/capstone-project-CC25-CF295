import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import db from "../../config/firebase.js";

const transactionsCollection = collection(db, "transactions");

export const addTransactionModel = async (data) => {
  const preparedData = {
    ...data,
    date: Timestamp.fromDate(data.date),
  };

  const docRef = await addDoc(transactionsCollection, preparedData);
  return docRef.id;
};

export const getTransactionsModel = async (userId, period) => {
  let startDate = null;
  const now = new Date();

  if (period === "weekly") {
    const day = now.getDay();
    const diffToMonday = (day + 6) % 7;
    startDate = new Date(now);
    startDate.setDate(now.getDate() - diffToMonday);
    startDate.setHours(0, 0, 0, 0);
  } else if (period === "monthly") {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  } else if (period === "yearly") {
    startDate = new Date(now.getFullYear(), 0, 1);
  }

  let q;
  if (startDate) {
    const startTimestamp = Timestamp.fromDate(startDate);

    q = query(
      transactionsCollection,
      where("userId", "==", userId),
      where("date", ">=", startTimestamp)
    );
  } else {
    q = query(transactionsCollection, where("userId", "==", userId));
  }

  const snapshot = await getDocs(q);
  if (snapshot.empty) return [];

  const formatTransaction = (doc) => {
    const data = doc.data();
    return {
      transactionId: doc.id,
      userId: data.userId,
      type: data.type,
      description: data.description,
      amount: data.amount,
      date: data.date?.toDate
        ? data.date.toDate().toISOString().split("T")[0]
        : data.date,
    };
  };

  return snapshot.docs.map(formatTransaction);
};
