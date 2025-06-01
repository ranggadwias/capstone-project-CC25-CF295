import { addTransactionModel } from "../../models/transactions/Transaction.js";

export const addTransaction = async (req, res) => {
  const { amount, type, description, date } = req.body;
  const userId = req.userId;

  try {
    const transactionData = {
      userId,
      amount,
      type,
      description,
      date: new Date(date),
    };

    const id = await addTransactionModel(transactionData);

    res.status(201).json({
      message: "Transaksi berhasil ditambahkan",
      transactionId: id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menambahkan transaksi",
      error: error.message,
    });
  }
};