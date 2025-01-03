import React, {useContext, useState} from "react";
import {Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Context} from "../../main.tsx";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            newErrors.password = 'Password must be at least 6 characters';
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

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
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
                error={!!errors.password}
                helperText={errors.password}
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
            <TextField
                label="Confirm your password"
                variant="outlined"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle confirm password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }
                }}
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
                                navigate('/');
                            })
                            .catch((error) => {
                                navigate('/');
                            });
                }}>
                Register
            </Button>

            <Box mt={3}>
                <Typography variant="body2">
                    <strong>Email:</strong> Must be a valid email address (e.g., user@example.com).
                </Typography>
                <Typography variant="body2">
                    <strong>Password:</strong>
                    <ul>
                        <li>At least 8 characters long.</li>
                        <li>At least one uppercase letter.</li>
                        <li>At least one lowercase letter.</li>
                        <li>At least one number.</li>
                        <li>At least one special character (e.g., #?!@$%^&*-).</li>
                    </ul>
                </Typography>
                <Typography variant="body2">
                    <strong>Nickname:</strong> Must be 2 to 10 characters long.
                </Typography>
            </Box>
        </Box>
    );
};

export default observer(Register);