import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/home/Home';
import Error from '../pages/error/Error';
import {AddZip} from "../pages/zip/AddZip";
import Layout from "../layout/Layout.tsx";
import ViewZip from "../pages/zip/ViewZip";
import Types from "../pages/types/Types.tsx";

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
                path: 'zips',
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
                path: 'types',
                // children: [
                //     {
                //         path: '/',
                element: <Types/>,
                        // loader: async ({request}) => {
                        //     const url = new URL(request.url);
                        //     const page = parseInt(url.searchParams.get('page') || '1', 10);
                        //     const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);
                        //     return {page, pageSize};
                        // }
                    // }
                // ]
            },
            {
                path: '*',
                element: <Error/>
            }
        ]
    }
]);


export {AppRoutes};