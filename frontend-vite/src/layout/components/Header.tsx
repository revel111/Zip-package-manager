import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div>
            <div>
                <Link to={`/`}>Main page</Link>
            </div>
            <div>
                <Link to={`/zips`}>Zips</Link>
            </div>
        </div>
    );
};

export default Header;