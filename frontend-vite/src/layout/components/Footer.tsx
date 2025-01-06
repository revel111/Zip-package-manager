import {Box, Typography, Link} from "@mui/material";

const Footer = () => {
    return (
        <Box
            sx={{
                mt: 4,
                py: 2,
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                color: "#555",
                boxShadow: 1,
                mb: 2
            }}
        >
            <Typography variant="body2" sx={{fontSize: "0.9rem"}}>
                Made by {""}
                <Link
                    href="https://github.com/revel111"
                    target="_blank"
                    rel="noopener"
                    sx={{textDecoration: "none", color: "primary.main", fontWeight: "bold"}}>
                    revel111
                </Link>
                {""} at the end of 2024 and the beginning of 2025.
            </Typography>
        </Box>
    );
};

export default Footer;