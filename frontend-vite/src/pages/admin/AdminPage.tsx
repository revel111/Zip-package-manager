import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const AdminPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => {
                navigate('/admin/types')
            }}>
                Go to panel with types
            </Button>
            <Button variant="contained" color="primary" onClick={() => {
                navigate('/admin/users')
            }}>
                Go to panel with users
            </Button>
            <Button variant="contained" color="primary" onClick={() => {
                navigate('/admin/zips')
            }}>
                Go to panel with zips
            </Button>
        </div>
    )
};

export default AdminPage;