import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import Sidebar from "../../components/Sidebar";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import EditProfileModal from "./EditAccountModal";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import {
  getUserProfile,
  updateUserProfile,
} from "../../services/account/account";

// Util: Convert image file to base64 string
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


function Account() {
  const userId = localStorage.getItem("user_id");
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const [tempProfile, setTempProfile] = useState(userData);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');

  // Image change handler
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await toBase64(file);
      setProfileImage(base64);
      localStorage.setItem("profile_image", base64);
    } catch (err) {
      console.error("Gagal konversi gambar:", err);
    }
  };

  // Fetch user data
  const fetchUserData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const user = await getUserProfile(userId, token);
      setUserData(user);
      setTempProfile(user);
    } catch (err) {
      console.error("Gagal memuat profil:", err.message);
    }
  }, [userId]);

  useEffect(() => {
    // Load profile image from localStorage
    const savedImage = localStorage.getItem("profile_image");
    if (savedImage) {
      setProfileImage(savedImage);
    }

    fetchUserData();
  }, [fetchUserData]);

  // Open modal with latest profile
  const handleOpenEditModal = () => {
    setTempProfile({ ...userData });
    setOpenEditModal(true);
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    try {
      const result = await updateUserProfile(userId, tempProfile);
      if (result.success) {
        setUserData(tempProfile);
        setOpenEditModal(false);
        setOpenSuccessModal(true);
      } else {
        console.error("Gagal update:", result.error);
        setOpenErrorModal(true);
      }
    } catch (err) {
      console.error("Terjadi kesalahan saat update:", err.message);
      setOpenErrorModal(true);
    }
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setOpenErrorModal(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box sx={{ flexGrow: 1, ml: isMobile ? 0 : "30px", mt: 4 }}>
        {isMobile && (
          <IconButton onClick={() => setSidebarOpen(true)} sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1400 }}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h3" fontWeight="bold">
          Account
        </Typography>

        <Card sx={{ mt: 4, p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} textAlign="center">
              <Avatar
                sx={{
                  width: 180,
                  height: 180,
                  mx: "auto",
                  bgcolor: "grey.400",
                  mb: 2,
                }}
                src={
                  profileImage ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="upload-avatar"
              />
              <label htmlFor="upload-avatar">
                <Button variant="outlined" component="span" sx={{ mt: 2 }}>
                  Upload Photo
                </Button>
              </label>
            </Grid>

            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                {["name", "phone", "address", "email"].map((key) => (
                  <Grid item xs={12} key={key}>
                    <TextField
                      fullWidth
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={userData[key]}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 4, textAlign: "right" }}>
                <Button
                  variant="contained"
                  onClick={handleOpenEditModal}
                  sx={{
                    bgcolor: "#E3EAF6",
                    color: "#000",
                    borderRadius: 2,
                    fontWeight: "bold",
                    px: 4,
                  }}
                >
                  EDIT
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>

        <EditProfileModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          onUpdate={handleUpdateProfile}
          tempProfile={tempProfile}
          setTempProfile={setTempProfile}
        />
        <SuccessModal
          open={openSuccessModal}
          onClose={() => setOpenSuccessModal(false)}
          message="Update Berhasil!"
        />
        <ErrorModal
          open={openErrorModal}
          onClose={() => setOpenErrorModal(false)}
          message="Perubahan Dibatalkan"
        />
      </Box>
    </Box>
  );
}

export default Account;