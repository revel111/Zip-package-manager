import {Typography} from "@mui/material";


const ZipRules = () => {
    return (
        <div>
            <Typography variant="body2">
                <strong>Name:</strong>Must be 2 to 20 characters long.
            </Typography>
            <Typography variant="body2">
                <strong>Description:</strong>Must be 20 to 200 characters long.
            </Typography>
        </div>
    );
};

export default ZipRules;