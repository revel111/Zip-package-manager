import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {Avatar} from "@mui/material";

const CustomAvatar = () => {
    return (
        <Avatar sx={{width: 100, height: 100}}>
            <AccountCircleIcon fontSize="large"/>
        </Avatar>
    );
};

export default CustomAvatar;