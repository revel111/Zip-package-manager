import {Typography} from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';

const Error = () => {
    return (
        <Typography
            variant="h4"
            sx={{
                color: '#555',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <ErrorIcon sx={{fontSize: "inherit", marginRight: "8px"}}/>
            404 Page wasn't found!
        </Typography>
    );
};

export default Error;