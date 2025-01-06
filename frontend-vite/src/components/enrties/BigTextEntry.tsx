import {Typography} from "@mui/material";

const BigTextEntry = ({text, align = 'left'}: { text: string | number, align?: string | 'left' }) => {
    return (
        <Typography
            variant="h4"
            sx={{
                color: "#555",
                display: "flex",
                justifyContent: align,
                alignItems: align,
                padding: 1
            }}
        >
            {text}
        </Typography>
    );
};

export default BigTextEntry;