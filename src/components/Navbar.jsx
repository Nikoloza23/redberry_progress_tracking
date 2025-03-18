import { useState } from "react";
import { Link } from "react-router-dom";

import AddEmployee from "../pages/AddEmployee";

import "../sass/styles/_navbar.scss";

const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <nav className="navbar">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <div className="logo"> Momentum ⏳</div>

                </Link>
                <div className="buttons">
                    <button className="action-button1"
                        onClick={() => setShowModal(true)}>
                        თანამშრომლის შექმნა
                    </button>
                    <Link to="/newtask" style={{ textDecoration: "none" }}>

                        <button className="action-button">+ შექმენი ახალი დავალება </button>
                    </Link>

                </div>
            </nav>
            {showModal && <AddEmployee onClose={() => setShowModal(false)} />}
        </>
    );
};

export default Navbar;
