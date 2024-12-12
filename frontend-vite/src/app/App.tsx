import {memo} from 'react';
import {AppRoutes} from "./Router.tsx";
import {RouterProvider} from "react-router-dom";

const App = memo(() => {
    return (
        <RouterProvider router={AppRoutes}/>
        // <AppRoutes/>
    );
});

export default App;
