import React from "react";
import logo from "../smart_home1.svg";
import { Link } from "react-router-dom";
import ProfileNavLink from "./ProfileNavLink";

const Navbar = () => {
    const companyName = "SmartHome";
    return (
        <nav
            className="navbar navbar-expand-sm navbar-dark bg-dark"
            aria-label="Third navbar example"
        >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img
                        src={logo}
                        width="30"
                        className="d-inline-block align-top"
                        alt=""
                    />
                </Link>
                <Link className="navbar-brand" to="/">
                    {companyName}
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarsExample03"
                    aria-controls="navbarsExample03"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample03">
                    <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                        <li className="nav-item active ">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/store">
                                Store
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                About
                            </Link>
                        </li>
                    </ul>
                    <ProfileNavLink />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
