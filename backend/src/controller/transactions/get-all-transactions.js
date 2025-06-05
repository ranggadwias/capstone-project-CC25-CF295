import { getTransactionsModel } from "../../models/transactions/Transaction.js";

export const getAllTransactions = async (req, res) => {
  const userId = req.userId;
  const { period } = req.query;

  try {
    const transactions = await getTransactionsModel(userId, period);
    res.status(200).json({ 
      message: "Data transaksi berhasil diambil",
      transactions
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data transaksi', error: error.message });
  }
};