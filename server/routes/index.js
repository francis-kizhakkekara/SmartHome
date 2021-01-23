const ApiUser = require("./ApiUser");
const ApiHomes = require("./ApiHomes");
const ApiDevices = require("./ApiDevices");

const ApiRouting = (app) => {
    app.use("/api", ApiUser);
    app.use("/api", ApiHomes);
    app.use("/api", ApiDevices);
};

module.exports = ApiRouting;
