import {Box, Button, CircularProgress, IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import React, {useContext, useState} from "react";
import {Context} from "../../main.tsx";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

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
    const [error, setError] = useState(null);

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

    const handleLogin = () => {
        store.login(data.email, data.password)
            .then((response) => {
                navigate('/');
            })
            .catch((error) => {
                navigate('/');
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
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Button onClick={handleLogin}>Login</Button>
            </Box>
        </div>
    );
};

export default observer(Login);