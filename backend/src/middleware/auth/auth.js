export const auth = (req, res, next) => {
  const userId = req.header("x-user-id");
  const userName = req.header("x-user-name");

  if (!userId || !userName) {
    return res.status(401).json({ message: "User belum login" });
  }

  req.userId = userId;
  req.userName = userName;

  next();
};

export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password minimal 8 karakter" });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password wajib diisi" });
  }

  next();
};