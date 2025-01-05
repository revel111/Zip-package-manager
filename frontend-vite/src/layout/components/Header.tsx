import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {Context} from "../../main.tsx";
import {observer} from "mobx-react-lite";
import {Button, Box, Typography} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import HomeIcon from "@mui/icons-material/Home";
import Person2Icon from "@mui/icons-material/Person2";
import AddIcon from '@mui/icons-material/Add';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Header = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 20px",
                bgcolor: "background.paper",
                boxShadow: 1,
                mb: 2,
            }}
        >
            <Box sx={{display: "flex", alignItems: "center", gap: 3}}>
                <Typography
                    variant="h4"
                    onClick={() => navigate("/")}
                    sx={{
                        cursor: "pointer",
                        "&:hover": {
                            color: "primary.main",
                        },
                    }}
                >
                    Zip Manager
                </Typography>

                <Button
                    startIcon={<HomeIcon/>}
                    onClick={() => navigate("/")}
                    sx={{textTransform: "none"}}
                >
                    Main Page
                </Button>
                <Button
                    startIcon={<FolderZipIcon/>}
                    onClick={() => navigate("/zips")}
                    sx={{textTransform: "none"}}
                >
                    Zips
                </Button>
                <Button
                    startIcon={<AddIcon/>}
                    onClick={() => navigate("/zips/add")}
                    sx={{textTransform: "none"}}
                >
                    Publish a new zip
                </Button>
                {store.isAuth && store.isAdmin() && (
                    <Button
                        startIcon={<AdminPanelSettingsIcon/>}
                        onClick={() => navigate("/admin")}
                        sx={{textTransform: "none"}}
                    >
                        Admin page
                    </Button>
                )}
            </Box>

            <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                {store.isAuth ? (
                    <>
                        <Button
                            onClick={async () => {
                                await store.logout();
                                navigate("/");
                            }}
                            startIcon={<LogoutIcon/>}
                            sx={{textTransform: "none"}}
                        >
                            Logout
                        </Button>
                        <Button
                            onClick={() => navigate(`/users/${store.user.id}`)}
                            startIcon={<Person2Icon/>}
                            sx={{textTransform: "none"}}
                        >
                            {store.user.nickname}
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            startIcon={<LoginIcon/>}
                            onClick={() => navigate("/login")}
                            sx={{textTransform: "none"}}
                        >
                            Login
                        </Button>
                        <Typography variant="body1">or</Typography>
                        <Button
                            onClick={() => navigate("/register")}
                            sx={{textTransform: "none"}}
                        >
                            Register
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default observer(Header);