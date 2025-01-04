import {Link} from "react-router-dom";
import {Card, Typography} from "@mui/material";
import {ReactNode} from "react";

interface AdminEntryProps {
    link: string;
    text: string;
    icon: ReactNode;
}

const AdminEntry = ({link, text, icon}: AdminEntryProps) => {
    return (
        <Link
            to={link}
            style={{
                textDecoration: 'none',
                color: 'inherit',
            }}
        >
            <Card sx={{width: 500, padding: 2, textAlign: "center"}}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        color: '#1976d2',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {icon} <span style={{marginLeft: '8px'}}>Go to {text}</span>
                </Typography>
            </Card>
        </Link>
    );
};

export default AdminEntry;
