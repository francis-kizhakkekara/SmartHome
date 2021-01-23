const DB = require("./create_all_db");

DB.init_db();

// Database Names
// user_login => user_id: int auto, email: varchar, password: varchar
// user_homes => serial_id: int auto, user_id int
// devices => device_id int auto, serial_id int, device_name varchar, on_off bool, dim_level int

const Crud_db = {};

Crud_db.createUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO user_login (email, password) VALUES (?, ?)";
        DB.con.query(sql, [email, password], function (err, result) {
            if (err) reject(err);
            console.log("Inserting User");
            //console.log(result);
            resolve(result);
        });
    });
};

Crud_db.checkLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        const sql =
            "SELECT * FROM user_login WHERE (email = ? AND password = ?)";

        DB.con.query(sql, [username, password], function (err, result) {
            if (err) reject(err);

            console.log("CHCECK LOGIN");
            console.log(result[0].user_id);
            console.log("CHCECK LOGIN END");

            return resolve(result);
        });
    });
};

Crud_db.retrieveAllUsers = () => {
    const sql = "SELECT * FROM user_login";

    DB.con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("ALL USERS");
        console.log(result);
    });
};

Crud_db.createHub = (user_id, serial_id) => {
    return new Promise((resolve, reject) => {
        const create_hub =
            "INSERT INTO user_homes (serial_id, user_id) VALUES (?, ?)";
        DB.con.query(create_hub, [serial_id, user_id], function (err, result) {
            if (err) reject(err);
            console.log("Create Hub");
            console.log(result);
            resolve(result);
        });
    });
};

Crud_db.retrieveHubs = (user_id) => {
    return new Promise((resolve, reject) => {
        const retrieve_hubs =
            "SELECT serial_id, status FROM user_homes WHERE user_id=?";
        DB.con.query(retrieve_hubs, [user_id], function (err, result) {
            if (err) reject(err);

            console.log("Retrieve Hub");
            console.log("Affected rows: " + result.affectedRows);

            return resolve(result);
        });
    });
};

Crud_db.retrieveDevices = (serial_id) => {
    return new Promise((resolve, reject) => {
        const retrieve_devices =
            "SELECT device_name, on_off, dim_level FROM devices WHERE serial_id=?";
        DB.con.query(
            retrieve_devices,
            [parseInt(serial_id)],
            function (err, result) {
                if (err) reject(err);

                console.log("Retrieve Devices");

                return resolve(result);
            }
        );
    });
};

Crud_db.updateConnStatus = (serial_id, state) => {
    const sql = "UPDATE user_homes SET status=? WHERE serial_id=?";

    DB.con.query(sql, [state, serial_id], function (err, result) {
        if (err) console.log(err);

        console.log("Update RPi Status");
        console.log("Affected rows: " + result.affectedRows);
    });
};

Crud_db.updateDeviceStatus = (serial_id, device_name, on_off, dim_level) => {
    const update_sql =
        "UPDATE devices SET on_off=?, dim_level=? WHERE (serial_id=? AND device_name=?)";

    DB.con.query(
        update_sql,
        [on_off, dim_level, serial_id, device_name],
        function (err, result) {
            if (err) console.log(err);

            console.log("Update Device Status");
            console.log("Affected rows: " + result.affectedRows);

            if (result.affectedRows === 0) {
                const insert_sql =
                    "INSERT INTO devices (serial_id, device_name, on_off, dim_level) VALUES (?, ?, ?, ?)";
                DB.con.query(
                    insert_sql,
                    [serial_id, device_name, on_off, dim_level],
                    function (err, result) {
                        if (err) console.log(err);
                        console.log("Insert Device Status");
                        console.log("Affected rows: " + result.affectedRows);
                    }
                );
            }
        }
    );
};

module.exports = Crud_db;
