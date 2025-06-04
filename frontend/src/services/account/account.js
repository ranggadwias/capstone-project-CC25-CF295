import api from '../../lib/axiosInstance';

export const getUserProfile = async (userId, token) => {
  const res = await api.get(`/api/auth/account/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateUserProfile = async (userId, updatedData) => {
  try {
    const token = localStorage.getItem('token');
    const res = await api.put(`/api/auth/account/${userId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      message: res.data.message,
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal memperbarui profil",
    };
  }
};