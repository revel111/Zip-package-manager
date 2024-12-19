import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/home/Home';
import Error from '../pages/error/Error';
import AddZip from "../pages/zip/AddZip";
import Layout from "../layout/Layout.tsx";
import ViewZip from "../pages/zip/ViewZip";

const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: 'home',
                element: <Home/>
            },
            {
                path: 'zip',
                children: [
                    {
                        path: 'add',
                        element: <AddZip/>
                    },
                    {
                        path: ':id',
                        element: <ViewZip/>
                    }
                ]
            },
            {
                path: '*',
                element: <Error/>
            }
        ]
    }
]);


export {AppRoutes};