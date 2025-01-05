import {useContext, useEffect} from 'react';
import AppRoutes from "./Router.tsx";
import {RouterProvider} from "react-router-dom";
import {Context} from "../main.tsx";
import {observer} from "mobx-react-lite";
import {CircularProgress} from "@mui/material";

const App = () => {
    const {store} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            store.checkAuth();
        }
    }, [store]);

    if (store.isLoading)
        return <CircularProgress/>

    return (
        <RouterProvider router={AppRoutes()}/>
    );
};

export default observer(App);
