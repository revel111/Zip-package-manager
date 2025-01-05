import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main.tsx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import CustomSnackBar from "../../components/textfields/CustomSnackBar.tsx";
import PasswordField from "../../components/textfields/PasswordTextField.tsx";

interface LoginData {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<LoginData>({
        email: "",
        password: "",
    });
    const { store } = useContext(Context);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "info" | "warning" | "error",
    });

    useEffect(() => {
        if (store.isAuth) navigate("/");
    }, [navigate, store.isAuth]);

    const showSnackbar = (message: string, severity: "success" | "info" | "warning" | "error") => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = async () => {
        await store.login(data.email, data.password)
            .then(() => {
                navigate("/");
            })
            .catch(() => {
                showSnackbar("Wrong email or password", "error");
            });
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: 400,
                margin: "auto",
                padding: 4,
                border: "1px solid #ccc",
                borderRadius: 4,
                boxShadow: 2,
                backgroundColor: "#fff",
            }}
        >
            <Typography variant="h4" sx={{ marginBottom: 3 }}>
                Login
            </Typography>
            <TextField
                label="Enter your email"
                variant="outlined"
                name="email"
                value={data.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <PasswordField
                label="Enter your password"
                name="password"
                value={data.password}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={handleLogin}
            >
                Login
            </Button>
            <CustomSnackBar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </Box>
    );
};

export default observer(Login);
