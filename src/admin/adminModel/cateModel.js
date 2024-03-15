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
    // Tiếp tục thực hiện yêu cầu chỉ khi không có lỗi
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

// Hàm để lấy thông tin của một danh mục dựa trên ID
const getCategoryById = (categoryId, callback) => {
    const query = "SELECT * FROM categories WHERE id = ?";
    connection.query(query, [categoryId], (err, category) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, category[0]); // Trả về kết quả đầu tiên nếu có
    });
};

const updateCategory = (categoryId, newData, callback) => {

    const query = "UPDATE categories SET name = ? WHERE id = ?";
    const values = [newData.name, categoryId];
    connection.query(query, values, (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result.changedRows); // Trả về số dòng đã thay đổi
    });
};

module.exports = {
    getCategoryList,
    addCategory,
    deleteCategory,
    getCategoryById,
    updateCategory
};
