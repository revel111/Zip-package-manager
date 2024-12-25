import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/home/Home';
import Error from '../pages/error/Error';
import Layout from "../layout/Layout.tsx";
import ViewZip from "../pages/zip/ViewZip";
import AdminPage from "../pages/admin/AdminPage.tsx";
import FeedZip from "../pages/zip/FeedZip.tsx";
import {AddZip} from "../pages/zip/AddZip.tsx";
import Types from "../pages/admin/types/Types.tsx";
import Login from "../pages/authorization/Login.tsx";
import Register from "../pages/authorization/Register.tsx";

const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: 'admin',
                children: [
                    {
                        index: true,
                        element: <AdminPage/>,
                    },
                    {
                        path: 'types',
                        element: <Types/>,
                    }
                ]
            },
            {
                path: 'zips',
                children: [
                    {
                        index: true,
                        element: <FeedZip/>
                    },
                    {
                        path: ':id',
                        element: <ViewZip/>
                    },
                    {
                        path: 'add',
                        element: <AddZip/>
                    }
                ]
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '*',
                element: <Error/>
            }
        ]
    }
]);

export {AppRoutes};