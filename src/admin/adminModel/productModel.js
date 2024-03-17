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

const addProduct = (name, price, sale_price, description, categoryId, image, callback) => {
    const query = "INSERT INTO products (name, image, price, sale_price, description, cate_id) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [name, price, sale_price, description, categoryId, image];

    connection.query(query, values, (err) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null);
    });
};


module.exports = {
    getAllProducts,
    addProduct
};
