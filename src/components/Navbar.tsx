import {Link} from "react-router-dom";
import "../Style.css";


function Navbar(){
    return(
        <>
            <div className="nav-main">
                <div className="title">
                    <h1>BlogSpace</h1>
                </div>
                <div className="nav-links">
                    <Link to="/" id="active">Home</Link>
                    <Link to="/create">Write Blog</Link>
                </div>
            </div>
        </>
    )
}

export default Navbar;