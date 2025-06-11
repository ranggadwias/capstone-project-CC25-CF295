import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  IconButton,
  Alert,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import Sidebar from "../../components/Sidebar";
import { addTransaction } from "../../services/transaction/transaction";

function Transaction() {
  const [form, setForm] = useState({
    type: "",
    amount: "",
    description: "",
    date: "",
  });

  const [classifiedCategory, setClassifiedCategory] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClassifyCategory = async (desc) => {
    if (!desc) return;
    try {
      const resKategori = await fetch("http://localhost:5000/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: desc }),
      });

      const kategoriData = await resKategori.json();

      if (!resKategori.ok)
        throw new Error(kategoriData.error || "Gagal klasifikasi");

      setClassifiedCategory(kategoriData.category);
    } catch (error) {
      console.error("Gagal klasifikasi:", error.message);
      setClassifiedCategory("ERROR");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        amount: parseFloat(form.amount),
        type: form.type,
        description: form.description,
        date: form.date,
        category: classifiedCategory,
      };

      const response = await addTransaction(data);
      console.log("Sukses:", response.message);

      setForm({ type: "", amount: "", description: "", date: "" });
      setClassifiedCategory("");
    } catch (error) {
      console.error("Gagal simpan transaksi:", error.message);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Box sx={{ flexGrow: 1, p: 4 }}>
        {isMobile && (
          <IconButton
            onClick={() => setSidebarOpen(true)}
            sx={{ position: "fixed", top: 16, left: 16, zIndex: 1400 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Add Transaction
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: "#fff",
            p: 4,
            borderRadius: 2,
            boxShadow: 1,
            maxWidth: "100%",
          }}
        >
          <TextField
            fullWidth
            select
            label="TYPE"
            name="type"
            value={form.type}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="NOMINAL"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="DESKRIPSI"
            name="description"
            value={form.description}
            onChange={handleChange}
            onBlur={() => handleClassifyCategory(form.description)}
            margin="normal"
          />

          <TextField
            label="DATE CREATED"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            sx={{ width: 200 }}
          />

          {classifiedCategory && (
            <Alert severity="info" sx={{ mt: 3 }}>
              Kategori hasil klasifikasi: <strong>{classifiedCategory}</strong>
            </Alert>
          )}

          <Box sx={{ textAlign: "right", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#BBD9EE", color: "#000" }}
            >
              Save
            </Button>
          </Box>

        </Box>
      </Box>
    </Box>
  );
}

export default Transaction;