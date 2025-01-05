import { Typography } from "@mui/material";
import { ReactNode } from "react";

const Error = ({ text, icon }: { text: string; icon: ReactNode }) => {
    return (
        <Typography
            variant="h4"
            sx={{
                color: "#555",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {icon && (
                <span style={{ fontSize: "inherit", marginRight: "8px", display: "flex" }}>
                    {icon}
                </span>
            )}
            {text}
        </Typography>
    );
};

export default Error;