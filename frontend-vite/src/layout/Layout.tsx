import Header from "./components/Header";
import Footer from "./components/Footer";
// import {ReactNode} from "react";
import {Outlet} from "react-router-dom";

// interface LayoutProps {
//     children: ReactNode;
// }

// const Layout = ({children}: LayoutProps) => {
const Layout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
            {/*<main>{children}</main>*/}
            <Footer/>
        </>
    );
};


export default Layout;