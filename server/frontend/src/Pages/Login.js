import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import LoginContext from "../Contexts/LoginContext";
import logo from "../smart_home1.svg";

// Login Page
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const LoginObj = useContext(LoginContext);

    // Check credentials and redirect to Welcome page if correct
    // Set user info in the LoginContext
    const loginHandler = (event) => {
        event.preventDefault();

        if (!email && !password) alert("Please enter email and password");
        else {
            const payload = { email, password };

            axios
                .post("/api/check-user", payload)
                .then((res) => {
                    const loginResult = res.data.check;
                    console.log(
                        "User ID: " +
                            res.data.user_id +
                            " Logged In: " +
                            loginResult
                    );

                    if (loginResult) {
                        LoginObj.setUserEmail(email);
                        LoginObj.setLoggedIn(true);
                        LoginObj.setUserID(res.data.user_id);
                        history.push("/user/" + email);
                    }
                })
                .catch((err) => console.error("Login Error: " + err));
        }
        console.log(
            "From: LoginJS, LoginObj: " + LoginObj.loggedIn + " ",
            LoginObj.userEmail + " " + LoginObj.userID
        );
    };
    return (
        <>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="" alt="logo" width="200px" />
                    <h1>Login</h1>
                    <p>Or</p>
                </header>

                <main className="container-sm form-min">
                    <form onSubmit={loginHandler}>
                        <div className="mb-3">
                            <label htmlFor="signinEmail" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                id="signinEmail"
                                placeholder="user@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="loginPassword"
                                className="form-label"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                id="loginPassword"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mb-3">
                            Submit
                        </button>
                    </form>

                    <p>Or</p>
                </main>

                <Link className="btn btn-primary" to="/signup">
                    Join Now
                </Link>
            </div>
        </>
    );
};

export default Login;
