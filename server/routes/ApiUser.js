const router = require("express").Router();
const DB = require("../src/database/crud_db");

router
    .route("/create-user")
    .post((req, res) => {
        // Testing inserting a user here

        if (req?.body.email && req?.body.password) {
            DB.createUser(req.body.email, req.body.password)
                .then((result) => {
                    res.json({ created: true });
                })
                .catch((err) => {
                    console.log(err);
                    res.json({ created: false, error: err.code });
                });
        } else {
            res.status(500).json({ created: false, error: "Wrong Parameters" });
        }
    })
    .get((req, res) => {
        res.status(404).send("CREATE API");
    });

router
    .route("/check-user")
    .post((req, res) => {
        if (req?.body.email && req?.body.password) {
            DB.checkLogin(req.body.email, req.body.password)
                .then((result) => {
                    if (result && result.length)
                        res.json({ check: true, user_id: result[0].user_id });
                    else res.json({ check: false });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({ check: false, error: err.code });
                });
        } else {
            res.status(500).json({ created: false, error: "Wrong Parameters" });
        }
    })
    .get((req, res) => {
        res.status(404).send("CHECK USER API");
    });

router
    .route("/")
    .post((req, res) => {
        res.send(req.body);
        console.log(req.body);
    })
    .get((req, res) => {
        res.send("API page");
    });

module.exports = router;
