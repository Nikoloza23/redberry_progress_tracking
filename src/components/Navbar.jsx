import "../sass/styles/navbar.scss";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo"> Momentum ⏳</div>
            <div className="buttons">
                <button className="action-button1">თანამშრომლის შექმნა</button>
                <button className="action-button">+ შექმენი ახალი დავალება </button>
            </div>
        </nav>
    );
};

export default Navbar;
