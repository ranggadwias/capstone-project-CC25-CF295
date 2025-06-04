import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import { createUser, findUserByEmail, getUserById, updateUserById } from "../../models/auth/User.js";

export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (user) {
      return res.status(400).json({ message: "Alamat email sudah digunakan" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
      isGoogleUser: false,
      phone: "",
      address: "",
    });

    res
      .status(201)
      .json({ message: "Pengguna berhasil didaftarkan", userId: newUser.id });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Terjadi kesalahan tak terduga. Silakan coba lagi nanti",
        error: error.message,
      });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email atau password tidak valid" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email atau password tidak valid" });
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
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Terjadi kesalahan tak terduga. Silakan coba lagi nanti",
        error: error.message,
      });
  }
};

export const googleLogin = async (req, res) => {
  const { access_token } = req.body;

  if (!access_token) {
    return res.status(400).json({ message: "Access token wajib disertakan" });
  }

  try {
    // Validasi token ke Google dan ambil info user
    const googleResponse = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`
    );
    if (!googleResponse.ok) {
      return res.status(401).json({ message: "Token Google tidak valid" });
    }
    const googleUser = await googleResponse.json();

    const { email, name } = googleUser;

    if (!email || !name) {
      return res.status(400).json({ message: "Data Google tidak lengkap" });
    }

    let user = await findUserByEmail(email);

    if (!user) {
      // User belum ada, buat baru dengan isGoogleUser = true
      user = await createUser({
        name,
        email,
        password: "",
        isGoogleUser: true,
        phone: "",
        address: "",
      });
    } else if (!user.isGoogleUser) {
      return res.status(400).json({
        message: "Email sudah terdaftar dengan password. Gunakan login manual.",
      });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      message: "Login dengan Google berhasil",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan tak terduga", error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Gagal ambil profil",
      error: error.message,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;

  try {
    await updateUserById(id, { name, email, phone, address });
    res.status(200).json({ message: "Profil berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ message: "Gagal memperbarui profil", error: error.message });
  }
};