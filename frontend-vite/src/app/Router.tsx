// import {createBrowserRouter} from 'react-router-dom';
import {Route, Routes} from 'react-router-dom';
import Home from '../pages/home/Home';
// import App from './App';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/'>
                <Route index element={<Home/>}/>
            </Route>
        </Routes>
    );
};

// const router = createBrowserRouter([
//     {
//         path: '/',
//         // element: <App />
//     }
// ]);

export {AppRoutes};