import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/home/Home';
import Error from '../pages/error/Error';
import {AddZip} from "../pages/zip/AddZip";
import Layout from "../layout/Layout.tsx";
import ViewZip from "../pages/zip/ViewZip";
import Types from "../pages/types/Types.tsx";
import AdminPage from "../pages/admin/AdminPage.tsx";
import FeedZip from "../pages/zip/FeedZip.tsx";

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
                element: <AdminPage/>
            },
            {
                path: 'zips',
                children: [
                    {
                        index: true,
                        element: <FeedZip/>
                    },
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
                path: 'types',
                element: <Types/>,
            },
            {
                path: '*',
                element: <Error/>
            }
        ]
    }
]);

export {AppRoutes};