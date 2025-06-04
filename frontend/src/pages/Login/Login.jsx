import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth/loginUser";
import api from "../../lib/axiosInstance";
import logo from "../../image/logo.png";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => handleGoogleSuccess(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleGoogleSuccess = async (codeResponse) => {
    try {
      const backendResponse = await api.post("/api/auth/google-login", {
        access_token: codeResponse.access_token,
      });

      localStorage.setItem("token", backendResponse.data.token);
      localStorage.setItem(
        "profile",
        JSON.stringify(backendResponse.data.user)
      );

      navigate("/dashboarduser", {
        state: { profile: backendResponse.data.user },
      });
    } catch (error) {
      console.error("Error during Google login:", error);
      setError("Google login failed. Please try again.");
      setOpenErrorModal(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await loginUser({ email, password });

    if (result.success) {
      setOpenSuccessModal(true);
    } else if (result.errorCode === "EMAIL_NOT_FOUND") {
      setError("Email not found.");
      setOpenErrorModal(true);
    } else if (result.errorCode === "WRONG_PASSWORD") {
      setError("Incorrect password.");
      setOpenErrorModal(true);
    } else if (result.errorCode === "EMPTY_FIELDS") {
      setError("Email and password are required.");
      setOpenErrorModal(true);
    } else {
      setError(
        result.errorMessage || "An error occurred, please try again later."
      );
      setOpenErrorModal(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    navigate("/dashboarduser");
  };

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
    setError("");
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
        <Box sx={{ width: "40%", textAlign: "center", mr: 5 }}>
          <img src={logo} alt="Logo" width={280} />
          <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
            FinMate
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            Smart Recording for Generation Z
          </Typography>
        </Box>

        <Box sx={{ width: "50%" }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            WELCOME
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Please enter your identity
          </Typography>

          <form onSubmit={handleSubmit}>
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
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                gap: 2,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  flex: 1,
                  backgroundColor: "#5C5470",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#453f5b" },
                }}
              >
                Login
              </Button>

              <Button
                onClick={() => navigate("/register")}
                variant="contained"
                sx={{
                  flex: 1,
                  backgroundColor: "#BBD9EE",
                  color: "#000",
                  "&:hover": { backgroundColor: "#A2C9E6" },
                }}
              >
                Register
              </Button>
            </Box>
          </form>

          <Typography align="center" variant="body1" sx={{ mt: 3 }}>
            Or login with Google
          </Typography>
          <Button
            onClick={handleGoogleLogin}
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
              backgroundColor: "#BBD9EE",
              color: "#000",
              "&:hover": { backgroundColor: "#A2C9E6" },
            }}
          >
            Sign in with Google
          </Button>
        </Box>
      </Paper>

      <SuccessModal open={openSuccessModal} onClose={handleCloseSuccessModal} />

      <ErrorModal
        open={openErrorModal}
        handleClose={handleCloseErrorModal}
        error={error}
      />
    </Container>
  );
}

export default Login;
