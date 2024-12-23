import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const AdminPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => {
                navigate('/types')
            }}>
                Go to panel with types
            </Button>
        </div>
    )
};

export default AdminPage;