import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";
import logo from "../../image/logo.png";

import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import { registerUser } from "../../services/auth/registerUser";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await registerUser({ name, email, password });

    if (result.success) {
      setOpenSuccessModal(true);
    } else {
      setError(result.error);
      setOpenErrorModal(true);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "95%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Left side: Logo + Description */}
        <Box sx={{ width: "40%", textAlign: "center", mr: 5 }}>
          <img src={logo} alt="Logo" width={280} />
          <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
            FinMate
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            Smart Recording for Generation Z
          </Typography>
        </Box>

        {/* Right side: Register form */}
        <Box sx={{ width: "50%" }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            REGISTRASI
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Please enter your identity
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  px: 5,
                  backgroundColor: "#5C5470",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#453f5b" },
                }}
              >
                Register
              </Button>

              <Typography variant="body2" sx={{ mt: 2 }}>
                Have an account?{" "}
                <Button
                  onClick={() => navigate("/login")}
                  sx={{
                    color: "#5C5470",
                    fontWeight: "bold",
                    textTransform: "none",
                    p: 0,
                    minWidth: "unset",
                  }}
                >
                  Login
                </Button>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      <SuccessModal
        open={openSuccessModal}
        onClose={() => {
          setOpenSuccessModal(false);
          navigate("/login");
        }}
      />
      <ErrorModal
        open={openErrorModal}
        onClose={() => {
          setOpenErrorModal(false);
          setError("");
        }}
        message={error}
      />
    </Container>
  );
}