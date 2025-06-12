import { getAllTransactionsByUser } from "../../models/transactions/Transaction.js";

// --- Klasifikasi pengeluaran kecil, sedang, besar ---
export const classifyExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await getAllTransactionsByUser(userId);

    // Filter pengeluaran (type === 'expense')
    const expenses = transactions.filter((t) => t.type === "expense");

    // Hitung mean dan std dev jumlah pengeluaran
    const amounts = expenses.map((t) => t.amount);
    const mean = amounts.reduce((a, b) => a + b, 0) / amounts.length || 0;
    const variance =
      amounts.reduce((a, b) => a + (b - mean) ** 2, 0) / amounts.length || 0;
    const stdDev = Math.sqrt(variance);

    // Klasifikasi: kecil < mean-stdDev, sedang dalam mean ± stdDev, besar > mean+stdDev
    const classified = expenses.map((t) => {
      let kategori = "Sedang";
      if (t.amount < mean - stdDev) kategori = "Kecil";
      else if (t.amount > mean + stdDev) kategori = "Besar";

      return { ...t, expenseCategory: kategori };
    });

    res.json({ message: "Classified expenses", data: classified });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// --- Deteksi Anomali ---
export const detectAnomalies = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await getAllTransactionsByUser(userId);

    const expenses = transactions.filter((t) => t.type === "expense");

    // Group by category
    const grouped = {};
    expenses.forEach((t) => {
      if (!grouped[t.category]) grouped[t.category] = [];
      grouped[t.category].push(t.amount);
    });

    // Hitung mean dan std dev per kategori
    const stats = {};
    for (const category in grouped) {
      const arr = grouped[category];
      const mean = arr.reduce((a, b) => a + b, 0) / arr.length || 0;
      const variance =
        arr.reduce((a, b) => a + (b - mean) ** 2, 0) / arr.length || 0;
      const stdDev = Math.sqrt(variance);
      stats[category] = { mean, stdDev };
    }

    // Deteksi anomali: amount > mean + 3*stdDev
    const anomalies = expenses.filter((t) => {
      const s = stats[t.category];
      return s && t.amount > s.mean + 3 * s.stdDev;
    });

    res.json({ message: "Detected anomalies", data: anomalies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// --- Rekomendasi Hemat ---
export const spendingRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await getAllTransactionsByUser(userId);
    const expenses = transactions.filter((t) => t.type === "expense");

    // Kategorikan besar, sedang, kecil (pakai fungsi sederhana dari classifyExpenses)
    const amounts = expenses.map((t) => t.amount);
    const mean = amounts.reduce((a, b) => a + b, 0) / amounts.length || 0;
    const variance =
      amounts.reduce((a, b) => a + (b - mean) ** 2, 0) / amounts.length || 0;
    const stdDev = Math.sqrt(variance);

    // Filter pengeluaran besar non investasi
    const bigNonInvestment = expenses.filter(
      (t) => t.amount > mean + stdDev && t.category !== "Investasi"
    );

    // Kategori pengeluaran terbanyak (kecuali investasi)
    const categoryCount = {};
    expenses.forEach((t) => {
      if (t.category !== "Investasi") {
        categoryCount[t.category] = (categoryCount[t.category] || 0) + 1;
      }
    });

    // Cari kategori dengan count terbesar
    const topCategory = Object.entries(categoryCount).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];

    const recommendations = [];

    if (bigNonInvestment.length > 0) {
      recommendations.push(
        `Hati-hati dengan kategori **${bigNonInvestment[0].category}** yang pengeluarannya besar.`
      );
    }

    if (topCategory) {
      recommendations.push(
        `Kategori pengeluaran tertinggi kamu adalah **${topCategory}**.`
      );
    }

    recommendations.push("Rajin mencatat dan evaluasi keuangan secara rutin ya!");

    res.json({ message: "Spending recommendations", data: recommendations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};