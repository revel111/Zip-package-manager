import {Typography} from "@mui/material";

const EmailNicknameRules = () => {
    return (
        <div>
            <Typography variant="body2">
                <strong>Email:</strong> Must be a valid email address (e.g., user@example.com).
            </Typography>
            <Typography variant="body2">
                <strong>Nickname:</strong> Must be 2 to 10 characters long.
            </Typography>
        </div>
    );
};

export default EmailNicknameRules;