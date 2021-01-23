const express = require("express");
const path = require("path");
const app = express();
const port = require("./serverPorts.json").express;
const TCPServer = require("./src/tcp_server/serverBlinky");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

// Serve React static files
app.use(express.static(path.join(__dirname, "frontend", "build")));

const ApiRouting = require("./routes");
ApiRouting(app);

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

// app.use((req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "build", "index.html"))
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
