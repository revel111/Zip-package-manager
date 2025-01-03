import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../main.tsx";
import {useNavigate} from "react-router-dom";
import {Alert, Avatar, Box, Button, Snackbar, TextField, Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import api from "../../app/Api.tsx";

const PrivateUserProfile = () => {
    const {store} = useContext(Context);
    const [formData, setFormData] = useState({
        email: store.user.email || '',
        nickname: store.user.nickname || '',
    });
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState({open: false, message: '', severity: ''});

    useEffect(async () => {
        if (localStorage.getItem('token')) {
            await store.checkAuth();
            if (!store.user) {
                navigate("/");
            } else {
                setFormData({
                    email: store.user.email || '',
                    nickname: store.user.nickname || '',
                });
            }
        } else
            navigate('/');
    }, [navigate, store]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            await api.users.update(store.user.email, formData.nickname, formData.email);
            setSnackbar({open: true, message: 'Profile updated successfully!', severity: 'success'});
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setSnackbar({ open: true, message: error.response.data.error, severity: 'error' });
            } else {
                setSnackbar({ open: true, message: 'An unexpected error occurred.', severity: 'error' });
            }
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({...snackbar, open: false});
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                p: 3,
                maxWidth: 400,
                margin: 'auto',
            }}
        >
            <Avatar sx={{width: 100, height: 100}}>
                <AccountCircleIcon fontSize="large"/>
            </Avatar>
            <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
            />
            <TextField
                label="Nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                fullWidth
                variant="outlined"
            />
            <Button variant="contained" onClick={handleSubmit} fullWidth>
                Save Changes
            </Button>

            <Box mt={3}>
                <Typography variant="body2">
                    <strong>Email:</strong> Must be a valid email address (e.g., user@example.com).
                </Typography>
                <Typography variant="body2">
                    <strong>Nickname:</strong> Must be 2 to 10 characters long.
                </Typography>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default PrivateUserProfile;