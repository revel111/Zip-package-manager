import React, {useState} from "react";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";


interface PasswordFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?: string;
    fullWidth?: boolean;
    margin?: 'none' | 'dense' | 'normal';
    required?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
                                                         label,
                                                         name,
                                                         value,
                                                         onChange,
                                                         error = false,
                                                         helperText = '',
                                                         fullWidth = true,
                                                         margin = 'normal',
                                                         required = true,
                                                     }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <TextField
            label={label}
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            name={name}
            value={value}
            onChange={onChange}
            fullWidth={fullWidth}
            margin={margin}
            required={required}
            error={error}
            helperText={helperText}
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
    );
};

export default PasswordField;