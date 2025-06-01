import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {
    Button, TextField, Typography, Box, Container, Dialog, DialogContent, DialogActions, IconButton
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error),
    });

    useEffect(() => {
        // Set default credentials untuk admin
        localStorage.setItem('nik', '123456778910');
        localStorage.setItem('password', 'admin123');
    }, []);

    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json',
                    },
                })
                .then((res) => {
                    localStorage.setItem('profile', JSON.stringify(res.data));
                    navigate('/dashboarduser', { state: { profile: res.data } });
                })
                .catch((err) => console.log(err));
        }
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedNik = localStorage.getItem('nik');
        const storedPassword = localStorage.getItem('password');

        if (name === storedNik && password === storedPassword) {
            const dummyProfile = {
                name: 'Admin User',
                email: 'admin@example.com',
            };
            localStorage.setItem('profile', JSON.stringify(dummyProfile)); // Simpan profil dummy
            setOpenSuccessModal(true);
        } else {
            setError('Email atau password salah');
            setOpenErrorModal(true);
        }
    };


    const handleCloseSuccessModal = () => {
        setOpenSuccessModal(false);
        navigate('/dashboard');
    };

    const handleCloseErrorModal = () => {
        setOpenErrorModal(false);
        setError(''); // Hapus pesan error setelah modal ditutup
    };

    return (
        <Container component="main" maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>


            <Box sx={{ width: '50%', margin: 'auto', textAlign: 'center' }}>
                <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    REGISTRASI
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    "Please enter your identity"
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

                    {error && <Typography color="error">{error}</Typography>}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2 }}>


                        <Box sx={{ flexGrow: 1, justifyContent: 'flex-start', mt: 2 }}>
                            <Button
                                onClick={() => navigate('/#')}
                                type="submit"
                                size="small"
                                variant="contained"
                                sx={{
                                    px: 3,
                                    backgroundColor: '#5C5470',
                                    color: '#000000',
                                    '&:hover': {
                                        backgroundColor: '#F0F0F0',
                                    },
                                }}
                            >
                                Register
                            </Button>
                        </Box>


                    </Box>

                </Box>

            </Box>


            <Dialog open={openSuccessModal} onClose={handleCloseSuccessModal}>
                <DialogContent sx={{ textAlign: 'center' }}>
                    <IconButton>
                        <CheckCircle color="success" sx={{ fontSize: 50 }} />
                    </IconButton>
                    <Typography>Login berhasil!</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSuccessModal} color="primary">OK</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openErrorModal} onClose={handleCloseErrorModal}>
                <DialogContent sx={{ textAlign: 'center' }}>
                    <IconButton>
                        <Cancel color="error" sx={{ fontSize: 50 }} />
                    </IconButton>
                    <Typography>{error}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseErrorModal} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default Register;
