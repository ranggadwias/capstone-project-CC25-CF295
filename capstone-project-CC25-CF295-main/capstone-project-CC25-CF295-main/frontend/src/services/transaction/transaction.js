import api from '../../lib/axiosInstance';

export const addTransaction = async (transactionData) => {
  const token = localStorage.getItem('token');

  try {
    const response = await api.post('/api/transactions', transactionData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Gagal menambahkan transaksi');
  }
};