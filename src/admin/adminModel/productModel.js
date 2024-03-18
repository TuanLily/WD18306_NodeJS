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


const deleteProduct = (productId, callback) => {
    const query = "DELETE FROM products WHERE id = ?";
    connection.query(query, [productId], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result);
    });
};


// Hàm để lấy thông tin của một danh mục dựa trên ID
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

const updateProduct = (productId, newData, callback) => {
    const query = "UPDATE products SET name = ?, price = ?, sale_price = ?, image = ?, description = ?, cate_id = ? WHERE id = ?";
    const values = [newData.name, newData.price, newData.sale_price, newData.image, newData.description, newData.cate_id, productId];
    connection.query(query, values, (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result.changedRows); // Trả về số dòng đã thay đổi
    });
};


module.exports = {
    getAllProducts,
    addProduct,
    deleteProduct,
    getProductById,
    updateProduct
};
