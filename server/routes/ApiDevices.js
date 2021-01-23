const router = require("express").Router();
const SetLight = require("../src/tcp_server/SetLight");
const DB = require("../src/database/crud_db");

router
    .route("/get-devices")
    .post((req, res) => {
        if (req?.body.serial_id) {
            DB.retrieveDevices(req.body.serial_id)
                .then((result) => {
                    res.json(result);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({ retrieved: false, error: err.code });
                });
        } else {
            res.status(500).json({
                retrieveDevices: false,
                error: "Wrong Parameters",
            });
        }
    })
    .get((req, res) => {
        res.status(404).send("Retrieve Devices API");
    });

router
    .route("/set-device")
    .post((req, res) => {
        if (req?.body.device_name && req?.body.serial_id) {
            SetLight(req.body.serial_id, req.body.dim_level);
            res.json({ device_updated: true });
        } else {
            res.status(500).json({
                device_updated: false,
                error: "Wrong Parameters",
                body: req.body,
            });
        }
    })
    .get((req, res) => {
        res.status(404).send("SET Devices API");
    });

module.exports = router;
