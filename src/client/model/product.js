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

module.exports = {
    getAllProducts
};
