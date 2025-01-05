import {useContext, useEffect, useState} from 'react';
import AppRoutes from "./Router.tsx";
import {RouterProvider} from "react-router-dom";
import {Context} from "../main.tsx";
import {observer} from "mobx-react-lite";
import {CircularProgress} from "@mui/material";

const App = () => {
    const { store } = useContext(Context);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            store.checkAuth().finally(() => setAuthChecked(true));
        } else {
            setAuthChecked(true);
        }
    }, [store]);

    if (store.isLoading || !authChecked) {
        return <CircularProgress />;
    }

    return (
        <RouterProvider router={AppRoutes()}/>
    );
};

export default observer(App);
