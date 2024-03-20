const connection = require("../../config/connect.js");

const getAllProducts = (callback) => {
    const query = "SELECT * FROM products";
    connection.query(query, (err, products) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, products);
    });
};

const getProductById = (productId, callback) => {
    const query = "SELECT * FROM products WHERE id = ?";
    connection.query(query, [productId], (err, product) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, product[0]); // Trả về kết quả đầu tiên nếu có
    });
};


const getRandomProducts = (callback) => {
    const query = "SELECT * FROM products ORDER BY RAND() LIMIT 6";
    connection.query(query, (err, products) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, products);
    });
};

const getProductsByKeyWord = (keyword, callback) => {
    // Thực hiện truy vấn CSDL để lấy danh sách sản phẩm có tên hoặc mô tả chứa từ khóa
    const query = "SELECT * FROM products WHERE name LIKE ? OR price LIKE ? OR sale_price LIKE ?";
    const searchKeyword = "%" + keyword + "%";
    connection.query(query, [searchKeyword, searchKeyword, searchKeyword], (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
};


module.exports = {
    getAllProducts,
    getProductById,
    getRandomProducts,
    getProductsByKeyWord
};
