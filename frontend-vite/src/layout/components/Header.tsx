import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {Context} from "../../main.tsx";
import {observer} from "mobx-react-lite";
import {Button} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Login';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import HomeIcon from '@mui/icons-material/Home';
import Person2Icon from '@mui/icons-material/Person2';

const Header = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const authenticate = async () => {
            if (localStorage.getItem('token')) {
                await store.checkAuth();
            }
        };

        authenticate();
    }, [store]);

    return (
        <div>
            <div>
                <HomeIcon
                    style={{cursor: 'pointer', marginRight: '10px'}}
                    onClick={() => navigate('/')}
                />
                <Link to={`/`}>Main page</Link>
            </div>
            <div>
                <FolderZipIcon
                    style={{cursor: 'pointer', marginRight: '10px'}}
                    onClick={() => navigate('/zips')}
                />
                <Link to={`/zips`}>Zips</Link>
            </div>
            <div>
                <div>
                    {store.isAuth ? (
                        `Logged in as ${store.user.nickname}`
                    ) : (
                        <div>
                            <LoginIcon
                                style={{cursor: 'pointer', marginRight: '10px'}}
                                onClick={() => navigate('/login')}
                            />
                            <Link to={`/login`}>Login</Link> or <Link to={`/register`}>Register</Link>
                        </div>
                    )}
                </div>
            </div>
            {store.isAuth && (
                <div>
                    <Button
                        onClick={async () => {
                            await store.logout();
                            navigate('/');
                        }}
                        startIcon={<LogoutIcon/>}
                    >
                        Logout
                    </Button>
                    <Button
                        onClick={() => navigate('/me')}
                        startIcon={<Person2Icon/>}
                    >
                        My account
                    </Button>
                </div>
            )}
        </div>
    );
};

export default observer(Header);