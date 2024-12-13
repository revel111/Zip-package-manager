import {createBrowserRouter} from 'react-router-dom';
// import {Route, Routes} from 'react-router-dom';
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
                path: '/',
                element: <Home/>
            },
            {
                path: '/zip',
                // element: <Zip/>, // Parent route for /zip
                children: [
                    {
                        path: 'add',
                        element: <AddZip/>
                    },
                    {
                        path: '/:id',
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