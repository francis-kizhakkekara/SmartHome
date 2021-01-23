// Controller to control the light
const net = require("net");

const port = require("../../serverPorts.json").TCPport;
const serverIP_addr = "localhost";
const socket1 = net.createConnection(port, serverIP_addr);

const SetLight = (serial_id, light_state = 0) => {
    let finalLightState = parseInt(light_state);
    if (finalLightState < 0) finalLightState = 0;
    if (finalLightState > 100) finalLightState = 100;

    payload = JSON.stringify({
        control: true,
        id: serial_id,
        light: finalLightState,
    });
    socket1.write(payload);
};

socket1.on("data", (data) => {
    const message = data.toString();
});
socket1.pipe(process.stdout); // Pipe data from the socket to stdout
socket1.on("close", () => process.exit()); // Quit when the socket closes.

module.exports = SetLight;
/**
 * Condition
 */
