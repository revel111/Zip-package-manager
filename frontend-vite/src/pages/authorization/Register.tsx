import React, { useContext, useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Context } from "../../main.tsx";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import PasswordRules from "../../components/rules/PasswordRules.tsx";
import EmailNicknameRules from "../../components/rules/EmailNicknameRules.tsx";
import PasswordField from "../../components/textfields/PasswordTextField.tsx";
import CustomSnackBar from "../../components/textfields/CustomSnackBar.tsx";

interface RegisterData {
    email: string;
    password: string;
    confirmPassword: string;
    nickname: string;
}

const Register = () => {
    const [data, setData] = useState<RegisterData>({
        email: "",
        password: "",
        confirmPassword: "",
        nickname: "",
    });
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const [errors, setErrors] = useState<Partial<RegisterData>>({});
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

    const validate = (): boolean => {
        const newErrors: Partial<RegisterData> = {};

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email) {
            newErrors.email = "Email is required";
        } else if (!emailPattern.test(data.email)) {
            newErrors.email = "Email is invalid";
        }

        const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if (!data.password) {
            newErrors.password = "Password is required";
        } else if (!passwordPattern.test(data.password)) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!data.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (data.password !== data.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!data.nickname) {
            newErrors.nickname = "Nickname is required";
        } else if (data.nickname.length < 2 || data.nickname.length > 10) {
            newErrors.nickname = "Nickname should be 2 to 10 symbols.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (validate()) {
            await store
                .registration(data.email, data.password, data.nickname, data.confirmPassword)
                .then(() => {
                    showSnackbar("Successfully registered!", "success");
                    navigate("/login");
                })
                .catch(() => {
                    showSnackbar("Email is already in use!", "error");
                });
        }
    };

    return (
        <Box
            component="form"
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
            noValidate
            autoComplete="off"
        >
            <Typography variant="h4" sx={{ marginBottom: 3 }}>
                Register
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
                error={!!errors.email}
                helperText={errors.email}
            />
            <PasswordField
                label="Enter your password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
            />
            <PasswordField
                label="Confirm your password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
            />
            <TextField
                label="Enter your nickname"
                variant="outlined"
                name="nickname"
                value={data.nickname}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                error={!!errors.nickname}
                helperText={errors.nickname}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={handleRegister}
            >
                Register
            </Button>
            <Box mt={3} width="100%">
                <EmailNicknameRules />
                <PasswordRules />
            </Box>
            <CustomSnackBar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </Box>
    );
};

export default observer(Register);
