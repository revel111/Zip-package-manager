import {Typography} from "@mui/material";

const PasswordRules = () => {
    return (
        <Typography variant="body2">
            <strong>Password:</strong>
            <ul>
                <li>At least 8 characters long.</li>
                <li>At least one uppercase letter.</li>
                <li>At least one lowercase letter.</li>
                <li>At least one number.</li>
                <li>At least one special character.</li>
            </ul>
        </Typography>
    );
};

export default PasswordRules;