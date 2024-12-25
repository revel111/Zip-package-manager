import React, {useState} from "react";
import {Box, Button, IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

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

    const [errors, setErrors] = useState<Partial<RegisterData>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form submitted:', data);
        }
    };

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
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
                }}}
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
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{mt: 2}}
            >
                Register
            </Button>
        </Box>
    );
};

export default Register;