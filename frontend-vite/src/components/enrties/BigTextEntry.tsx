import {Typography} from "@mui/material";

const BigTextEntry = ({text}: { text: string }) => {
    return (
        <Typography
            variant="h4"
            sx={{
                color: "#555",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 1
            }}
        >
            {text}
        </Typography>
    );
};

export default BigTextEntry;