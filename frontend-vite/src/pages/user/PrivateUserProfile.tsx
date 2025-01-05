import {useContext, useEffect, useState} from 'react';
import {Context} from "../../main.tsx";
import {useNavigate} from "react-router-dom";
import {
    Avatar,
    Box,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import api from "../../app/Api.tsx";
import PasswordRules from "../../components/rules/PasswordRules.tsx";
import PasswordField from "../../components/textfields/PasswordTextField.tsx";
import CustomSnackBar from "../../components/textfields/CustomSnackBar.tsx";
import ConfirmDialog from "../../components/dialog/ConfirmDialog.tsx";

interface ChangePassword {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface UpdateUser {
    email: string;
    nickname: string;
}

const PrivateUserProfile = () => {
    const {store} = useContext(Context);
    const [formData, setFormData] = useState<UpdateUser>({
        email: store.user.email || '',
        nickname: store.user.nickname || '',
    });
    const navigate = useNavigate();
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
    const [passwordData, setPasswordData] = useState<ChangePassword>(
        {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    const [userErrors, setUserErrors] = useState<Partial<UpdateUser>>({});
    const [passwordErrors, setPasswordErrors] = useState<Partial<ChangePassword>>({});
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'info' | 'warning' | 'error',
    });
    const [passwordSubmitOpen, setPasswordSubmitOpen] = useState(false);
    const [userDataSubmitOpen, setUserDataSubmitOpen] = useState(false);

    const showSnackbar = (message: string, severity: 'success' | 'info' | 'warning' | 'error') => {
        setSnackbar({open: true, message, severity});
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({...prev, open: false}));
    };

    useEffect(() => {
        const verifyAuth = async () => {
            if (store.isAuth) {
                await store.checkAuth();
                if (!store.user) {
                    navigate("/login");
                } else {
                    setFormData({
                        email: store.user.email || '',
                        nickname: store.user.nickname || '',
                    });
                }
            } else {
                navigate("/login");
            }
        };

        verifyAuth();
    }, [navigate, store]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePasswordChange = (e) => {
        const {name, value} = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        if (validate())
            try {
                await api.users.update(formData.nickname, formData.email);
                showSnackbar('Profile updated successfully!', 'success');
            } catch (error) {
                showSnackbar('Email is already in use.', 'error');
            }
    };

    const validate = (): boolean => {
        const newErrors: Partial<UpdateUser> = {};

        if (!formData.nickname) {
            newErrors.nickname = 'Nickname is required';
        } else if (formData.nickname.length < 2 || formData.nickname.length > 10) {
            newErrors.nickname = 'Nickname should be 2 to 10 symbols.';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailPattern.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        setUserErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePasswordSubmit = async () => {
        if (validatePasswords())
            try {
                await api.users.changePassword(passwordData.oldPassword, passwordData.newPassword, passwordData.confirmPassword);
                showSnackbar('Password changed successfully!', 'success');
                setPasswordDialogOpen(false);
                setPasswordData({oldPassword: '', newPassword: '', confirmPassword: ''});
            } catch (error) {
                showSnackbar('Wrong data was provided!', 'error');
            }
    };

    const validatePasswords = (): boolean => {
        const newErrors: Partial<ChangePassword> = {};

        const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if (!passwordData.newPassword) {
            newErrors.newPassword = 'Password is required';
        } else if (!passwordPattern.test(passwordData.newPassword)) {
            newErrors.newPassword = 'Password must be at least 8 characters';
        }

        if (!passwordData.oldPassword) {
            newErrors.oldPassword = 'Password is required';
        }

        if (!passwordData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (passwordData.newPassword !== passwordData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setPasswordErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                p: 3,
                maxWidth: 400,
                margin: 'auto',
            }}
        >
            <Avatar sx={{width: 100, height: 100}}>
                <AccountCircleIcon fontSize="large"/>
            </Avatar>
            <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                error={!!userErrors.email}
                helperText={userErrors.email}
            />
            <TextField
                label="Nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                error={!!userErrors.nickname}
                helperText={userErrors.nickname}
            />
            <Button variant="contained" onClick={() => setUserDataSubmitOpen(true)} fullWidth>
                Save Changes
            </Button>

            <ConfirmDialog
                open={userDataSubmitOpen}
                message={"Do you really want to change your data?"}
                onConfirm={() => {
                    setUserDataSubmitOpen(false);
                    handleSubmit();
                }}
                onCancel={() => setUserDataSubmitOpen(false)}
            />

            <Box mt={3}>
                <Typography variant="body2">
                    <strong>Email:</strong> Must be a valid email address (e.g., user@example.com).
                </Typography>
                <Typography variant="body2">
                    <strong>Nickname:</strong> Must be 2 to 10 characters long.
                </Typography>
            </Box>

            <Button variant="outlined" onClick={() => setPasswordDialogOpen(true)} fullWidth>
                Change Password
            </Button>

            <Dialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)}>
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent>
                    <PasswordField
                        label="Enter your password"
                        name="oldPassword"
                        value={passwordData.oldPassword}
                        onChange={handlePasswordChange}
                        error={!!passwordErrors.oldPassword}
                        helperText={passwordErrors.oldPassword}
                    />
                    <PasswordField
                        label="Enter your new password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        error={!!passwordErrors.newPassword}
                        helperText={passwordErrors.newPassword}
                    />
                    <PasswordField
                        label="Confirm your password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        error={!!passwordErrors.confirmPassword}
                        helperText={passwordErrors.confirmPassword}
                    />
                </DialogContent>
                <Box mt={3}>
                    <PasswordRules/>
                </Box>

                <DialogActions>
                    <Button onClick={() => setPasswordDialogOpen(false)}>Cancel</Button>
                    <Button onClick={() => setPasswordSubmitOpen(true)} variant="contained">Change</Button>
                </DialogActions>

                <ConfirmDialog
                    open={passwordSubmitOpen}
                    message={"Do you really want to change your password?"}
                    onConfirm={() => {
                        setPasswordSubmitOpen(false);
                        handlePasswordSubmit();
                    }}
                    onCancel={() => setPasswordSubmitOpen(false)}
                ></ConfirmDialog>
            </Dialog>

            <CustomSnackBar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </Box>
    );
};

export default PrivateUserProfile;