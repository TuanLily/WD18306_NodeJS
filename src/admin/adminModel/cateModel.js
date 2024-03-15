// Import module để thao tác với cơ sở dữ liệu
const connection = require("../../config/connect.js");

// Hàm để lấy danh sách danh mục từ cơ sở dữ liệu
const getCategoryList = (callback) => {
    const query = "SELECT * FROM categories";
    connection.query(query, (err, categories) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, categories);
    });
};

const addCategory = (name, callback) => {
    const query = "INSERT INTO categories (name) VALUES (?)";
    connection.query(query, [name], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result.insertId);
    });
};

const deleteCategory = (categoryId, callback) => {
    const query = "DELETE FROM categories WHERE id = ?";
    connection.query(query, [categoryId], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result);
    });
};
module.exports = {
    getCategoryList,
    addCategory,
    deleteCategory
};
