import {createBrowserRouter, Navigate} from 'react-router-dom';
import Home from '../pages/home/Home';
import Error from '../pages/errors/Error';
import Layout from "../layout/Layout.tsx";
import ZipPage from "../pages/zip/ZipPage.tsx";
import AdminPage from "../pages/admin/AdminPage.tsx";
import FeedZip from "../pages/zip/FeedZip.tsx";
import {AddZip} from "../pages/zip/AddZip.tsx";
import Types from "../pages/admin/tables/Types.tsx";
import Login from "../pages/authorization/Login.tsx";
import Register from "../pages/authorization/Register.tsx";
import PublicUserProfile from "../pages/user/PublicUserProfile.tsx";
import Users from "../pages/admin/tables/Users.tsx";
import PrivateUserProfile from "../pages/user/PrivateUserProfile.tsx";
import Zips from "../pages/admin/tables/Zips.tsx";
import ErrorIcon from '@mui/icons-material/Error';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import TypePage from "../pages/types/TypePage.tsx";


const AppRoutes = () => {
    return createBrowserRouter([
        {
            path: '/',
            element: <Layout/>,
            children: [
                {
                    index: true,
                    element: <Home/>
                },
                {
                    path: 'home',
                    element: <Navigate to={'/'}/>
                },
                {
                    path: 'homepage',
                    element: <Navigate to={'/'}/>
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
                        },
                        {
                            // TODO
                            path: 'users',
                            element: <Users/>
                        },
                        {
                            // TODO
                            path: 'zips',
                            element: <Zips/>
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
                            // TODO
                            path: ':id',
                            element: <ZipPage/>
                        },
                        {
                            // TODO
                            path: 'add',
                            element: <AddZip/>
                        }
                    ]
                },
                {
                    path: 'login',
                    element: <Login/>
                },
                {
                    path: 'types/:id',
                    element: <TypePage/>
                },
                {
                    path: 'register',
                    element: <Register/>
                },
                {
                    path: 'me',
                    element: <PrivateUserProfile/>
                },
                {
                    path: 'users/:id',
                    element: <PublicUserProfile/>
                },
                {
                    path: 'unauthorized',
                    element: <Error icon={<DoDisturbIcon/>} text={"401 Access denied."}/>
                },
                {
                    path: '*',
                    element: <Error icon={<ErrorIcon/>} text={"404 Page not found"}/>
                }
            ]
        }
    ])
};

export default AppRoutes;