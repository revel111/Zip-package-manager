import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography} from '@mui/material';

interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
                                                         open,
                                                         title = 'Confirm',
                                                         message,
                                                         onConfirm,
                                                         onCancel,
                                                         confirmText = 'Yes',
                                                         cancelText = 'No',
                                                     }) => {
    return (
        <Dialog open={open} onClose={onCancel}>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="inherit">
                    {cancelText}
                </Button>
                <Button onClick={onConfirm} color="primary" variant="contained">
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;