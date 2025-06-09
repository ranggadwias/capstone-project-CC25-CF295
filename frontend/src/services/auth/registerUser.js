import api from '../../lib/axiosInstance';

export const registerUser = async ({ name, email, password }) => {
  try {
    const res = await api.post('/api/auth/register', { name, email, password });
    return { success: true, message: res.data.message, userId: res.data.userId };
  } catch (err) {
    const errorMsg = err.response?.data?.message || 'Registrasi gagal';
    return { success: false, error: errorMsg };
  }
};