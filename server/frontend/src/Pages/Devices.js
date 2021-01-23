import React, { useEffect, useState } from "react";
import logo from "../smart_home1.svg";
import { useParams } from "react-router-dom";
import Card from "../Componentz/Card";
import axios from "axios";
import "./Devices.css";

// Devices page for the hub user selected
// Interact with the devices from this page
const Devices = () => {
    const params = useParams();
    const [deviceList, setDeviceList] = useState([]);
    const [light, setLight] = useState(0);

    // Toggle light handler
    const lightHandler = (index) => {
        let on_off = false;
        if (light === 0) {
            setLight(100);
            on_off = true;
        } else {
            setLight(0);
            on_off = false;
        }
        axios
            .post("/api/set-device", {
                device_name: "light1",
                serial_id: params.hubid,
                on_off,
                dim_level: light,
            })
            .then((res) => {
                if (res.data) {
                    console.log("Device Updated: " + res.data.device_updated);
                    if (res.data.device_updated) {
                        const newDeviceList = [...deviceList];
                        newDeviceList[index] = {
                            ...deviceList[index],
                            dim_level: light,
                        };
                        setDeviceList(newDeviceList);
                    }
                }
            })
            .catch((err) => console.error(err.response.data));
    };

    // On load, fetch all the devices for the specific hub
    useEffect(() => {
        axios
            .post("/api/get-devices", {
                serial_id: params.hubid,
            })
            .then((res) => {
                if (res.data) {
                    setDeviceList([...res.data]);
                    console.log("Found Hubs: " + JSON.stringify(deviceList));
                }
            })
            .catch((err) => console.error(err.response.data));
    }, []);

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
                    <h1>DEVICES</h1>
                    <h2>{JSON.stringify(params)}</h2>
                </header>

                <div className="containter">
                    <div class="row row-cols-1 row-cols-md-3 g-4">
                        {deviceList.map((card, index) => {
                            return (
                                <div class="col">
                                    <button
                                        onClick={() => lightHandler(index)}
                                        className="unstyled"
                                    >
                                        <Card
                                            title={card.device_name}
                                            body={
                                                "Status: " +
                                                card.on_off +
                                                "\nIntensity:" +
                                                card.dim_level
                                            }
                                            status={card.dim_level}
                                        />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Devices;
