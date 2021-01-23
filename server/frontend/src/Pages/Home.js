import React from "react";
import { Link } from "react-router-dom";
import logo from "../smart_home1.svg";

// Home page
const Home = () => {
    const companyName = "SmartHome";

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <img
                        src={logo}
                        className="App-logo"
                        alt="logo"
                        width="100px"
                    />
                    <p>Make your home smarter with {companyName} systems.</p>
                    <p> Click below to get started.</p>
                    <Link className="nav-link btn btn-primary" to="/signup">
                        Signup
                    </Link>
                    <p>Or</p>
                    <Link className="nav-link btn btn-primary" to="/login">
                        Login
                    </Link>
                </header>
            </div>
        </>
    );
};

export default Home;
