// src/components/RecommendationWithCategory.jsx
import React from "react";
import { Typography, List, ListItem, ListItemText, Paper } from "@mui/material";

const RecommendationWithCategory = ({ income, expenditures, showWarning }) => {
  const percentage = income !== 0 ? (Math.abs(expenditures) / income) * 100 : 0;
  let recommendations = [];

  if (showWarning) {
    recommendations.push("⚠️ Pengeluaran melebihi 90% dari pemasukan, pertimbangkan untuk mengurangi pengeluaran tidak penting.");
  } else if (percentage > 70) {
    recommendations.push("🔍 Cek kembali kebutuhan pokok dan kurangi pengeluaran hiburan.");
  } else if (percentage < 50) {
    recommendations.push("✅ Keuangan kamu cukup sehat, bisa dialokasikan ke tabungan atau investasi.");
  } else {
    recommendations.push("💡 Pertahankan pola pengeluaran saat ini dan evaluasi berkala.");
  }

  return (
    <Paper sx={{ mt: 4, p: 3, backgroundColor: "#fffbea" }} elevation={3}>
      <Typography variant="h6" gutterBottom>
        Rekomendasi Keuangan
      </Typography>

      {showWarning ? (
        <Typography variant="body2" color="error" sx={{ fontWeight: "bold", mb: 1 }}>
          ⚠️ Warning: Pengeluaran kamu melebihi 90% dari pemasukan!
        </Typography>
      ) : (
        <Typography variant="body2" color="error" sx={{ mb: 1 }}>
          ⚠️ Pengeluaran masih aman tapi tetap perlu dipantau.
        </Typography>
      )}

      <List>
        {recommendations.map((rec, index) => (
          <ListItem key={index}>
            <ListItemText primary={rec} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RecommendationWithCategory;
