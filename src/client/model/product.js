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

module.exports = {
    getAllProducts,
    getProductById,
    getRandomProducts
};
