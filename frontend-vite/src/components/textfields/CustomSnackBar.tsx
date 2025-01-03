import React from 'react';
import {Alert, Snackbar} from "@mui/material";

interface CustomSnackBarProps {
    open: boolean;
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error';
    autoHideDuration?: number;
    onClose: () => void;
}

const CustomSnackBar: React.FC<CustomSnackBarProps> = ({
                                                           open,
                                                           message,
                                                           severity,
                                                           autoHideDuration = 6000,
                                                           onClose,
                                                       }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
            <Alert onClose={onClose} severity={severity} sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackBar;