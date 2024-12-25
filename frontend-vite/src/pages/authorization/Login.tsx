import {Box, IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import React, {useState} from "react";

interface LoginData {
    email: string;
    password: string;
}

const Login = () => {
    const [data, setData] = useState<LoginData>({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', data);
    };

    return (
        <div>
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
            </Box>
        </div>
    );
};

export default Login;