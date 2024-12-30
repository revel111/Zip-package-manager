import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {Context} from "../../main.tsx";
import {observer} from "mobx-react-lite";
import {Button} from "@mui/material";

const Header = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token'))
            store.checkAuth()
    }, [store]);

    return (
        <div>
            <div>
                <Link to={`/`}>Main page</Link>
            </div>
            <div>
                <Link to={`/zips`}>Zips</Link>
            </div>
            <div>
                <h1>{store.isAuth ? `User: ${store.user.email}` : <Link to={`/login`}>Login</Link>}</h1>
            </div>
            {store.isAuth && (
                <Button onClick={() => {
                    store.logout();
                    navigate('/');
                }}>
                    Logout
                </Button>
            )}
        </div>
    );
};

export default observer(Header);