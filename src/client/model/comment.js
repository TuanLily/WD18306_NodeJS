const connection = require("../../config/connect.js");


const addComment = (userId, productId, content, callback) => {
    const createdAt = new Date();
    connection.query(
        "INSERT INTO comments (user_id, product_id, content) VALUES ( ?, ?, ?)",
        [userId, productId, content, createdAt],
        (err, result) => {
            if (err) {
                console.error("Error adding comment:", err);
                callback(err, null);
                return;
            }
            console.log("Comment added successfully");
            callback(null, result.insertId);
        }
    );
};

const getAllCommentsByProductId = (productId, callback) => {
    connection.query(
        "SELECT comments.*, users.fullname FROM comments JOIN users ON comments.user_id = users.id WHERE comments.product_id = ?",
        [productId],
        (err, results) => {
            if (err) {
                console.error("Error retrieving comments:", err);
                callback(err, null);
                return;
            }
            console.log("Comments retrieved successfully");
            callback(null, results);
        }
    );
};



module.exports = {
    addComment,
    getAllCommentsByProductId
};