export const validateTransaction = (req, res, next) => {
  const {  type, amount, description, date } = req.body;
  const userId = req.userId;
  if (!userId || !type || !amount || !description || !date) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }
  if (!['income', 'expense'].includes(type)) {
    return res.status(400).json({ message: "Tipe transaksi tidak valid" });
  }
  next();
};