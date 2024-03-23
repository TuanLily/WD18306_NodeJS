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

const findUserById = (userId, callback) => {
    const query = "SELECT * FROM users WHERE id = ?";
    connection.query(query, [userId], (err, users) => {
        if (err) {
            callback(err, null);
            return;
        }
        if (users.length === 0) {
            callback(null, null); // Không tìm thấy người dùng có id tương ứng
            return;
        }
        const user = users[0];
        callback(null, user);
    });
};


const updateUser = (userId, newData, callback) => {
    const query = "UPDATE users SET fullname = ?, email = ?, tel = ?, address = ?, password = ?, role = ? WHERE id = ?";
    const values = [newData.fullname, newData.email, newData.tel, newData.address, newData.password, newData.role, userId];
    connection.query(query, values, (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result.changedRows); // Trả về số dòng đã thay đổi
    });
};

module.exports = {
    getAllUsers,
    findUserById,
    updateUser
};