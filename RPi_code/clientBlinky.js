const Gpio = require("pigpio").Gpio;
const net = require("net");

// Server port and ip address
const port = 3500;
const serverIP_addr = "192.168.1.208";

// Setup socket
let retrying = false;
let socket1 = new net.Socket();
socket1.connect(port, serverIP_addr);
socket1.counted = 0; // Reconnect count

// Setup GPIO pin and set light to off
const led = new Gpio(13, { mode: Gpio.OUTPUT });
let lightIntensity = 0;
setLight(lightIntensity);

// TODO: Status Object for future us
statusObj = {
    control: false,
    serial_id: 300,
    devices: [{ name: "light1", isOn: false, dim_lvl: lightIntensity }],
};

// On connect, send light state
socket1.on("connect", () => {
    retrying = false;
    console.log("Connected to server");
    socket1.write(
        //JSON.stringify(statusObj)
        JSON.stringify({
            control: false,
            id: 300,
            light: lightIntensity,
            done: false,
        })
    );
});

// When server sends data
socket1.on("data", function (data) {
    //console.log(data);
    const message = data?.toString();
    const msgObj = JSON.parse(message);

    // Set state of light
    lightIntensity = msgObj.light;
    setLight(lightIntensity);

    // Reply with the current state
    payload = JSON.stringify({
        control: false,
        id: 300,
        light: lightIntensity,
        done: true,
    });
    socket1.write(payload);

    console.log(message + "...done");
});

socket1.on("error", (error) => {
    console.log("Error: " + error.code);
});

socket1.on("close", (error) => {
    socket1.counted++;
    console.log("Closed. Now reconnecting...", socket1.counted);
    //console.log(error);

    if (!retrying) retrying = true;
    setTimeout(() => socket1.connect(port, serverIP_addr), 3000);
});

/**
 * HARDWARE PWM
 * Duty Cycle from 0 to 1,000,000
 * Frequency: 0 to 187500000
 * 20,000 increments for 20ms goes 0 > 1,000,000 in 1 sec
 */

/**
 * SOFTWARE PWM
 * Duty Cycle from 0 to 255
 * Frequency
 */

// Set light intensity using hardware PWM
function setLight(intensity) {
    // Check if it is within range of 0 to 100
    if (intensity >= 0 && intensity <= 100) {
        let duty_cycle = Math.round(10_000 * intensity);
        led.hardwarePwmWrite(10000, duty_cycle); // 0 to 1_000_000;
    } else led.hardwarePwmWrite(10000, 0); // 0 to 1_000_000;
}

/**
 * RPi State
 * {control: bool, id: num, light: num}
 * Control true for server connection
 * and control false for RPi connection
 */
