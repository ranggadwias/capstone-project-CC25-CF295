import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import { Storage } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getDashboardSummary } from "../../services/dashboard/dashboardUser";
import Sidebar from "../../components/Sidebar";
import RecommendationWithCategory from "../../components/RecommendationWithCategory";
import { useNavigate } from "react-router-dom";

function DashboardUser() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
      } catch (error) {
        console.error("Error fetching summary", error);
        setError("Failed to load dashboard summary.");
      }
    };

    fetchSummary();
  }, []);

  if (error) return <div>{error}</div>;
  if (!summary) return <div>Loading...</div>;

  const { userName, availableBalance, totalIncome, totalExpense } = summary;

  const percentage =
    totalIncome !== 0 ? (Math.abs(totalExpense) / totalIncome) * 100 : 0;

  const handleAddTransaction = () => {
    navigate("/transaction");
  };

  const handleViewReport = () => {
    navigate("/report");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Box sx={{ flexGrow: 1, p: 3 }}>
        {isMobile && (
          <IconButton
            onClick={() => setSidebarOpen(true)}
            sx={{
              position: "fixed",
              top: 16,
              left: 16,
              zIndex: 1400,
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", ml: isMobile ? 6 : 0 }}
        >
          Dashboard
        </Typography>

        <Typography variant="h4" sx={{ mb: 2 }}>
          Welcome, {userName}
        </Typography>

        <Card
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            mb: 5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Storage sx={{ fontSize: 30, marginRight: 2 }} />
            <CardContent sx={{ p: 0 }}>
              <Typography variant="subtitle1">Available Balance</Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Rp {availableBalance.toLocaleString("id-ID")}
              </Typography>
            </CardContent>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#BBD9EE", color: "#000" }}
              onClick={handleAddTransaction}
            >
              Add Transaction
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#E3E3E3", color: "#000" }}
              onClick={handleViewReport}
            >
              View Report
            </Button>
          </Box>
        </Card>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: "center", p: 2, height: "100%" }}>
              <Typography variant="subtitle1" gutterBottom>
                This Month
              </Typography>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: `conic-gradient(#ccc 0% ${percentage}%, #BBD9EE ${percentage}% 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  mx: "auto",
                }}
              >
                {percentage.toFixed(0)}%
              </Box>
              <Typography variant="caption">
                of Rp {totalIncome.toLocaleString("id-ID")}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Card sx={{ backgroundColor: "#E0F0FC", p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Total Income
                  </Typography>
                  <Typography variant="h6">
                    Rp {totalIncome.toLocaleString("id-ID")}
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                      height: 10,
                      backgroundColor: "#c0e0f9",
                      borderRadius: 5,
                    }}
                  >
                    <Box
                      sx={{
                        width:
                          totalExpense !== 0
                            ? `${Math.min(
                                (totalIncome / Math.abs(totalExpense)) * 100,
                                100
                              )}%`
                            : "0%",
                        height: "100%",
                        backgroundColor: "#5BA2D3",
                        borderRadius: 5,
                      }}
                    />
                  </Box>
                </Card>
              </Grid>

              <Grid item>
                <Card sx={{ border: "1px solid red", p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Total Expenditure
                  </Typography>
                  <Typography variant="h6" color="error">
                    Rp {Math.abs(totalExpense).toLocaleString("id-ID")}
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                      height: 10,
                      backgroundColor: "#f5bdbd",
                      borderRadius: 5,
                    }}
                  >
                    <Box
                      sx={{
                        width:
                          totalIncome !== 0
                            ? `${Math.min(
                                (Math.abs(totalExpense) / totalIncome) * 100,
                                100
                              )}%`
                            : "0%",
                        height: "100%",
                        backgroundColor: "red",
                        borderRadius: 5,
                      }}
                    />
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <RecommendationWithCategory
          income={totalIncome}
          expenditures={totalExpense}
          showWarning={percentage >= 90}
        />
      </Box>
    </Box>
  );
}

export default DashboardUser;