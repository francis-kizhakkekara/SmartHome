import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import LoginContext from "./Contexts/LoginContext";
import "./App.css";

//Navbar
import Navbar from "./Componentz/Navbar";

// Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Error from "./Pages/Error";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Store from "./Pages/Store";
import Welcome from "./Pages/Welcome";
import Devices from "./Pages/Devices";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("placeholerEMAIL");
    const [userID, setUserID] = useState(0);

    // This object in LoginContext let child components set login state
    const loginObj = {
        loggedIn,
        setLoggedIn,
        userEmail,
        setUserEmail,
        userID,
        setUserID,
    };

    return (
        <LoginContext.Provider value={loginObj}>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/">
                        <Home></Home>
                    </Route>
                    <Route exact path="/login">
                        <Login></Login>
                    </Route>

                    <Route exact path="/signup">
                        <Signup></Signup>
                    </Route>

                    <Route exact path="/store">
                        <Store></Store>
                    </Route>

                    <Route exact path="/about">
                        <About></About>
                    </Route>
                    {/* Redirect to login page if not logged in*/}
                    <Route
                        path="/user/:username"
                        exact
                        strict
                        render={() => {
                            console.log("Redirect: " + !loggedIn);
                            return loggedIn ? (
                                <Welcome />
                            ) : (
                                <Redirect to="/login" />
                            );
                        }}
                    ></Route>
                    {/* Redirect to login page if not logged in*/}
                    <Route
                        path="/user/:username/:hubid/devices"
                        exact
                        strict
                        render={() => {
                            console.log("Redirect: " + !loggedIn);
                            return loggedIn ? (
                                <Devices />
                            ) : (
                                <Redirect to="/login" />
                            );
                        }}
                    ></Route>
                    <Route exact path="/*">
                        <Error></Error>
                    </Route>
                </Switch>
            </Router>
        </LoginContext.Provider>
    );
}

export default App;
