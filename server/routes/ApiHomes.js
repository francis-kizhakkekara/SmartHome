const router = require("express").Router();
const DB = require("../src/database/crud_db");

router
    .route("/set-hub")
    .post((req, res) => {
        if (req?.body.user_id && req?.body.serial_id) {
            DB.createHub(req.body.user_id, req.body.serial_id)
                .then((result) => {
                    if (result && result.affectedRows)
                        res.json({ created: true });
                    else res.json({ created: false });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({ created: false, error: err.code });
                });
        } else {
            res.status(500).json({
                created: false,
                error: "Wrong Parameters",
                body: req.body,
            });
        }
    })
    .get((req, res) => {
        res.status(404).send("SET Devices API");
    });

router
    .route("/get-hub")
    .post((req, res) => {
        if (req?.body.user_id) {
            DB.retrieveHubs(req.body.user_id).then((result) => {
                result ? res.json(result) : res.json({ hubs: false });
            });
        } else res.status(400).json({ hubs: null });
    })
    .get((req, res) => {
        res.status(404).send("GET Hub API");
    });

module.exports = router;
