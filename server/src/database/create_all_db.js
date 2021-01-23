const mysql = require("mysql");
const db_setup = require("./mysql.json");

const con = mysql.createConnection(db_setup.mysql_data);

function create_login_db() {
    const user_login =
        "CREATE TABLE IF NOT EXISTS user_login (user_id INT AUTO_INCREMENT, email VARCHAR(255) UNIQUE NOT NULL, " +
        "password VARCHAR(255) NOT NULL, PRIMARY KEY(user_id))";
    con.query(user_login, function (err, result) {
        if (err) throw err;
        console.log("Login Table");
        //console.log(result);
    });
}

function create_homes_db() {
    const user_homes =
        "CREATE TABLE IF NOT EXISTS user_homes (conn_id INT AUTO_INCREMENT PRIMARY KEY, serial_id INT, user_id INT, status BOOLEAN)";
    con.query(user_homes, function (err, result) {
        if (err) throw err;
        console.log("Homes Table");
        //console.log(result);
    });

    // Add constraint on user_id and serial_id to be unique. Only needed for initial setup
    //     const homes_constraint =
    //         "ALTER TABLE user_homes ADD CONSTRAINT uniq_serial_user UNIQUE(serial_id, user_id);";
    //     con.query(homes_constraint, function (err, result) {
    //         if (err) throw err;
    //         console.log("Homes Table Unique Constraint");
    //         //console.log(result);
    //     });
}

const create_devices_db = () => {
    const serial_id_devices =
        "CREATE TABLE IF NOT EXISTS devices (device_id INT AUTO_INCREMENT PRIMARY KEY, serial_id INT," +
        " device_name VARCHAR(255), on_off BOOLEAN, dim_level INT)";
    con.query(serial_id_devices, function (err, result) {
        if (err) throw err;
        console.log("Devices Table");
        //console.log(result);
    });
};

const insert_device = (device_info) => {
    const { name, state, dim_lvl } = device_info;
};

const CreateDB = { con };
CreateDB.init_db = () => {
    create_login_db();
    create_homes_db();
    create_devices_db();
};

module.exports = CreateDB;
