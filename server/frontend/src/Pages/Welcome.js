import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
//import { useParams } from "react-router-dom";
import LoginContext from "../Contexts/LoginContext";
import logo from "../smart_home1.svg";
import { Link } from "react-router-dom";
import Card from "../Componentz/Card";

// Welcome page after user login
// View their hubs and its status and let them add hubs
const Welcome = () => {
    const loginContextObj = useContext(LoginContext);

    const [hub, setHub] = useState("");
    const [displayHubs, setDisplayHubs] = useState([]);

    //On load, fetch user's hubs and their status
    useEffect(() => {
        axios
            .post("/api/get-hub", {
                user_id: loginContextObj.userID,
            })
            .then((res) => {
                if (res.data) {
                    setDisplayHubs([...res.data]);
                    console.log("Found Hubs: " + JSON.stringify(displayHubs));
                }
            })
            .catch((err) => console.error(err.response.data));
    }, []);

    // Add hub
    const addHubHandler = (event) => {
        event.preventDefault();
        console.log("Device Adder: " + hub);
        axios
            .post("/api/set-hub", {
                user_id: loginContextObj.userID,
                serial_id: hub,
            })
            .then((res) => {
                if (res.data.created) {
                    console.log("Hub Created: " + res.data.created);
                }
            })
            .catch((err) => console.error(err.response.data));
    };

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
                    <h1>{"Welcome, " + loginContextObj.userEmail}</h1>
                </header>

                <div className="containter">
                    <div class="row row-cols-1 row-cols-md-3 g-4">
                        {displayHubs.map((card) => {
                            return (
                                <div class="col">
                                    <Link
                                        to={
                                            "/user/" +
                                            loginContextObj.userEmail +
                                            "/" +
                                            card.serial_id +
                                            "/devices"
                                        }
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Card
                                            title={card.serial_id}
                                            body={"Status: " + card.status}
                                            status={card.status}
                                        />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <hr></hr>

                <main className="container-sm form-min">
                    <form onSubmit={addHubHandler}>
                        <div className="mb-3">
                            <label htmlFor="hubID" className="form-label">
                                Enter Hub ID to add it
                            </label>
                            <input
                                type="number"
                                className="form-control form-control-lg"
                                id="hubID"
                                placeholder="000"
                                value={hub}
                                onChange={(e) => setHub(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mb-3">
                            Add Hub
                        </button>
                    </form>
                </main>
            </div>
        </>
    );
};
export default Welcome;
