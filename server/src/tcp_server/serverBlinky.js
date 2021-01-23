const net = require("net");
const port = require("../../serverPorts.json").TCPport;
const DB = require("../database/crud_db");

const idToSocket = new Map(); // map serial_id to socket, for connections from backend
const idToLightState = new Map(); // map serial_id to light state, for connections from backend
const socketToid = new Map(); // map socket to id, when socket disconnect update DB

const server = net.createServer((socket) => {
    // When client sends data
    socket.on("data", (data) => {
        const message = data.toString();
        const msgObj = JSON.parse(message);

        // if control is false, then its from raspberry pi. add it to maps
        if (!msgObj.control) {
            idToSocket[msgObj.id] = socket;
            idToLightState[msgObj.id] = msgObj.light;
            socketToid[socket] = msgObj.id;

            const serial_id = socketToid[socket];
            DB.updateConnStatus(msgObj.id, true);
            const on_off_state = msgObj.light > 0 ? true : false;
            DB.updateDeviceStatus(
                msgObj.id,
                "light1",
                on_off_state,
                msgObj.light
            );
        }
        // else look for rpi socket in idToSocket and send instruction to it
        else {
            // If if id is there, then send instruction to the socket
            if (idToSocket[msgObj.id]) idToSocket[msgObj.id].write(message);
        }
        console.log(message);
        console.log(idToLightState);
    });

    // When socket gets errors
    socket.on("error", (error) => {
        console.log("Server Socket error: ", error.message);
    });

    socket.on("close", () => {
        // If a RPi socket closes, then update database status
        const serial_id = socketToid[socket];
        DB.updateConnStatus(serial_id, false);
    });
});

// Listening for any problems with the server
server.on("error", (error) => {
    console.log("Server Errors: ", error.message);
});

// Listen on port
server.listen(port, () => {
    console.log("Server listening at http://localhost:" + port);
});

module.exports.TCPServer = server;
/**
 *  {
    control: true,
    id: 343,
    "light": 'on',

}
 */
