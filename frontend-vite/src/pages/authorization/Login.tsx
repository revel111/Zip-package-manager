import {Box, Button, CircularProgress, IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import React, {useContext, useState} from "react";
import {Context} from "../../main.tsx";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import CustomSnackBar from "../../components/textfields/CustomSnackBar.tsx";

interface LoginData {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<LoginData>({
        email: '',
        password: '',
    });
    const {store} = useContext(Context);
    const [showPassword, setShowPassword] = useState(false);
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
        return <CircularProgress />

    if (store.isAuth)
        navigate("/");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    const handleLogin = async () => {
        await store.login(data.email, data.password)
            .then((response) => {
                navigate('/');
            })
            .catch((error) => {
                showSnackbar('Wrong email or password', 'error');
            });
    };

    return (
        <div>
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
                />
                <TextField
                    label="Enter your password"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }
                    }}
                />
                <Button onClick={handleLogin}>Login</Button>
            </Box>
            <CustomSnackBar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </div>
    );
};

export default observer(Login);