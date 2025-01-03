import React, {useContext, useState} from "react";
import {Alert, Box, Button, CircularProgress, Snackbar, TextField} from "@mui/material";
import {Context} from "../../main.tsx";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
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
        email: '',
        password: '',
        confirmPassword: '',
        nickname: '',
    });
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const [errors, setErrors] = useState<Partial<RegisterData>>({});
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'info' | 'warning' | 'error',
    });

    const showSnackbar = (message: string, severity: 'success' | 'info' | 'warning' | 'error') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    if (store.isLoading)
        return <CircularProgress/>

    if (store.isAuth)
        navigate("/");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validate = (): boolean => {
        const newErrors: Partial<RegisterData> = {};

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email) {
            newErrors.email = 'Email is required';
        } else if (!emailPattern.test(data.email)) {
            newErrors.email = 'Email is invalid';
        }

        const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if (!data.password) {
            newErrors.password = 'Password is required';
        } else if (!passwordPattern.test(data.password)) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!data.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (data.password !== data.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!data.nickname) {
            newErrors.nickname = 'Nickname is required';
        } else if (data.nickname.length < 2 || data.nickname.length > 10) {
            newErrors.nickname = 'Nickname should be 2 to 10 symbols.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
        >
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
                onClick={async () => {
                    if (validate())
                        await store.registration(data.email, data.password, data.nickname, data.confirmPassword)
                            .then((response) => {
                                showSnackbar('Successfully registered!', 'success');
                                navigate('/login');
                            })
                            .catch((error) => {
                                showSnackbar('Email is already in use!', 'error');
                            });
                }}>
                Register
            </Button>

            <Box mt={3}>
                <EmailNicknameRules/>
                <PasswordRules/>
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