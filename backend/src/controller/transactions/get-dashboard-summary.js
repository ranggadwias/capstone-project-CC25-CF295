import { getTransactionsModel } from "../../models/transactions/Transaction.js";

export const getDashboardSummary = async (req, res) => {
  const userId = req.userId;

  try {
    const transactions = await getTransactionsModel(userId);

    const totalIncome = transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const availableBalance = totalIncome - totalExpense;

    res.status(200).json({
      message: "Data dashboard berhasil diambil",
      data: {
        availableBalance,
        totalIncome,
        totalExpense: -totalExpense,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data dashboard",
      error: error.message,
    });
  }
};