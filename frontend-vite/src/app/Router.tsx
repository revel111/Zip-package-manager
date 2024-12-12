import {createBrowserRouter} from 'react-router-dom';
// import {Route, Routes} from 'react-router-dom';
import Home from '../pages/home/Home';
import Error from '../pages/error/Error';
import AddZip from "../pages/zip/AddZip";
// import ViewZip from "../pages/zip/ViewZip";

const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/zip/add',
        element: <AddZip/>
    },
    {
        path: '*',
        element: <Error/>
    }
]);

export {AppRoutes};