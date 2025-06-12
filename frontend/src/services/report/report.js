import api from '../../lib/axiosInstance';

export const getReport = async (token, period) => {
  try {
    const res = await api.get('/api/transactions', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { period },
    });
    return res.data.transactions;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const getSummary = async (token) => {
  const res = await api.get('/api/transactions/summary', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};