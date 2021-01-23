import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import logo from "../smart_home1.svg";
import "./Signup.css";

// Signup page
const Signup = () => {
    // States for
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const history = useHistory();

    // Redirect to Login page if user created
    const signinHander = (event) => {
        event.preventDefault();

        if (password !== confirm_password)
            alert("Please enter matching password");
        else {
            const payload = { email, password };

            // If
            axios
                .post("/api/create-user", payload)
                .then((res) => {
                    console.log("User Created: " + res.data.created);
                    if (res.data.created) history.push("/login");
                })
                .catch((err) => console.error(err.response.data));
        }
        console.log(email);
        console.log(password);
        console.log(confirm_password);
    };
    return (
        <>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="" alt="logo" width="200px" />
                    <h1>Signup</h1>
                </header>
                <main className="container-sm form-min">
                    <form onSubmit={signinHander}>
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
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="signinPassword1"
                                className="form-label"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                id="signinPassword1"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="signinPassword2"
                                className="form-label"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                id="signinPassword2"
                                placeholder="Confirm Password"
                                value={confirm_password}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mb-3">
                            Submit
                        </button>
                    </form>

                    <p>Or</p>
                    <Link className="btn btn-primary" to="/login">
                        Login
                    </Link>
                </main>
            </div>
        </>
    );
};

export default Signup;
