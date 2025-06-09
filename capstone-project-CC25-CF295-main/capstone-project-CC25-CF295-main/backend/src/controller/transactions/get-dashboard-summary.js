import { getTransactionsModel } from "../../models/transactions/Transaction.js";
import { getUserById } from "../../models/auth/User.js";  // Import model untuk ambil user data

export const getDashboardSummary = async (req, res) => {
  const userId = req.userId;  // Ambil userId dari request (misalnya JWT)

  try {
    const user = await getUserById(userId);  // Pake getUserById untuk ambil user berdasarkan userId
    
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const transactions = await getTransactionsModel(userId);  // Ambil transaksi berdasarkan userId

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
        userName: user.name,  // Ambil nama dari user yang sudah diambil
        availableBalance,
        totalIncome,
        totalExpense: -totalExpense,
      },
    });
  } catch (error) {
    console.error("Failed to fetch dashboard summary", error);
    res.status(500).json({
      message: "Gagal mengambil data dashboard",
      error: error.message,
    });
  }
};