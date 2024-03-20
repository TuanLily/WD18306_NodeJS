const connection = require("../../config/connect.js");


const getAllUsers = (callback) => {
    const query = "SELECT * FROM users";
    connection.query(query, (err, categories) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, categories);
    });
};


module.exports = {
    getAllUsers
};