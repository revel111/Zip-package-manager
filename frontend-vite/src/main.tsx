import {createContext, StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
// import './index.css'
import App from './app/App.tsx'
import Store from "./store/store.ts";

interface IStore {
    store: Store;
}

const store = new Store();

export const Context = createContext<IStore>({
    store,
});

createRoot(document.getElementById('root')!).render(
    <Context.Provider value={{store}}>
        <App/>
    </Context.Provider>,
)