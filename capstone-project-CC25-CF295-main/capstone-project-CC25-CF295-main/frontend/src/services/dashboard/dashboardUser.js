import api from "../../lib/axiosInstance";

export const getDashboardSummary = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    const response = await api.get("/api/transactions/summary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch dashboard data", error);
    throw error;
  }
};
