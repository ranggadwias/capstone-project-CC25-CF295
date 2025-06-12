import api from '../../lib/axiosInstance';

const API_URL = "/api/transactions";

export const addTransaction = async (transactionData) => {
  const token = localStorage.getItem('token');

  try {
    const response = await api.post(`${API_URL}`, transactionData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Gagal menambahkan transaksi');
  }
};

export const getClassifiedExpenses = async () => {
  const res = await api.get(`${API_URL}/classified`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data.data;
};

export const getAnomalies = async () => {
  const res = await api.get(`${API_URL}/anomalies`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data.data;
};

export const getRecommendations = async () => {
  const res = await api.get(`${API_URL}/recommendations`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data.data;
};