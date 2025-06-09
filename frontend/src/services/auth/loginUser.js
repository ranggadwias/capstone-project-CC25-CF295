import api from '../../lib/axiosInstance';

const mapBackendError = (msg) => {
  const normalized = msg.toLowerCase();
  if (normalized.includes("tidak ditemukan")) return "EMAIL_NOT_FOUND";
  if (normalized.includes("password") && normalized.includes("salah")) return "WRONG_PASSWORD";
  if (normalized.includes("wajib diisi")) return "EMPTY_FIELDS";
  return "UNKNOWN_ERROR";
};

/**
 * Login user dan simpan data ke localStorage
 * @param {Object} credentials - { email, password }
 * @returns {Object} - { success, token, user, message } atau error info
 */
export const loginUser = async ({ email, password }) => {
  try {
    const { data } = await api.post('/api/auth/login', { email, password });

    const { token, user, message } = data;

    if (!token || !user?.id) {
      return {
        success: false,
        errorCode: "INVALID_RESPONSE",
        errorMessage: "Respon login tidak lengkap",
      };
    }

    // ✅ Simpan ke localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user_id', user.id);
    localStorage.setItem('profile', JSON.stringify(user));

    return {
      success: true,
      token,
      user,
      message,
    };
  } catch (err) {
    const msg = err.response?.data?.message || "Login gagal";
    return {
      success: false,
      errorCode: mapBackendError(msg),
      errorMessage: msg,
    };
  }
};