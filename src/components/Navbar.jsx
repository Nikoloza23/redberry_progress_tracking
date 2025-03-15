import { Link } from "react-router-dom";
import "../sass/styles/_navbar.scss";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" style={{ textDecoration: "none" }}>
                <div className="logo"> Momentum ⏳</div>

            </Link>
            <div className="buttons">
                <button className="action-button1">თანამშრომლის შექმნა</button>
                <Link to="/newtask" style={{ textDecoration: "none" }}>

                    <button className="action-button">+ შექმენი ახალი დავალება </button>
                </Link>

            </div>
        </nav>
    );
};

export default Navbar;
