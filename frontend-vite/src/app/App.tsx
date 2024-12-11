import {memo} from 'react';
import {AppRoutes} from "./Router.tsx";

const App = memo(() => {
    return (
        <AppRoutes/>
    );
});

export default App;
