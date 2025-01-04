import {Box} from "@mui/material";
import AdminEntry from "../../components/enrties/AdminEntry.tsx";
import {Dashboard, People} from "@mui/icons-material";
import FolderZipIcon from "@mui/icons-material/FolderZip";

const AdminPage = () => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center"
        }}>
            <AdminEntry link={'/admin/zips'} text={'zips'} icon={<FolderZipIcon/>}/>
            <AdminEntry link={'/admin/users'} text={'users'} icon={<People/>}/>
            <AdminEntry link={'/admin/types'} text={'types'} icon={<Dashboard/>}/>
        </Box>
    );
};

export default AdminPage;