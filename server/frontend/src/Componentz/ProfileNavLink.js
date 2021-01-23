import React, { useContext } from "react";
import LoginContext from "../Contexts/LoginContext";
import { Link } from "react-router-dom";

const ProfileNavLink = () => {
    const loginContextObj = useContext(LoginContext);

    const logout = () => {
        loginContextObj.setLoggedIn(false);
        loginContextObj.setUserEmail("");
        console.log(
            "Logged State > login: " +
                loginContextObj.loggedIn +
                " email: " +
                loginContextObj.userEmail
        );
    };

    if (loginContextObj.loggedIn) {
        return (
            <>
                <ul className="navbar-nav mb-2 mb-sm-0 justify-content-end">
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="dropdown03"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {"User: " + loginContextObj.userEmail}
                        </a>
                        <ul
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="dropdown03"
                        >
                            <li>
                                <Link
                                    className="dropdown-item"
                                    to={"/user/" + loginContextObj.userEmail}
                                >
                                    Hubs
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="/about">
                                    Devices
                                </Link>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </>
        );
    } else
        return (
            <>
                <ul className="navbar-nav mb-2 mb-sm-0 justify-content-end">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">
                            Signup
                        </Link>
                    </li>
                </ul>
            </>
        );
};

export default ProfileNavLink;
