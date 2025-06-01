import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from "../../models/auth/User.js"; 

export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (user) {
      return res.status(400).json({ message: "Alamat email sudah digunakan" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await createUser({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Pengguna berhasil didaftarkan", userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan tak terduga. Silakan coba lagi nanti", error: error.message });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Email atau password tidak valid" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email atau password tidak valid" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        name: user.name,
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan tak terduga. Silakan coba lagi nanti", error: error.message });
  }
};