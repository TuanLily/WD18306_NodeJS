const connection = require("../../config/connect.js");


const loginUser = (email, password, callback) => {
    const query = "SELECT id, fullname, email, password, role FROM users WHERE email = ? AND password = ?";
    connection.query(query, [email, password], (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results[0]);
        }
    });
};

module.exports = {
    loginUser
};