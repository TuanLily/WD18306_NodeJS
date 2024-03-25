const connection = require("../../config/connect.js");
const bcrypt = require("bcrypt");


const loginUser = (email, password, callback) => {
    const query = "SELECT id, fullname, email, password, role FROM users WHERE email = ?";
    connection.query(query, [email], (error, results) => {
        if (error) {
            return callback(error, null);
        }

        if (results.length === 0) {
            // Không tìm thấy người dùng có email tương ứng
            return callback(null, null);
        }

        const user = results[0];
        bcrypt.compare(password, user.password, (compareError, isMatch) => {
            if (compareError || !isMatch) {
                // Mật khẩu không khớp
                return callback(null, null);
            }

            // Mật khẩu khớp, trả về thông tin người dùng
            callback(null, user);
        });
    });
};


const addUser = (fullname, email, password, callback) => {
    const query = "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";
    connection.query(query, [fullname, email, password], (error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    });
};

const getUserByEmail = (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    connection.query(query, [email], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            if (result.length > 0) {

                callback(null, result[0]);
            } else {
                callback(null, null);
            }
        }
    });
};



module.exports = {
    loginUser,
    addUser,
    getUserByEmail
};