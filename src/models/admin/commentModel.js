const connection = require("../../config/connect.js");

const getAllComments = (callback) => {
    connection.query(
        "SELECT comments.*, products.name AS product_name, users.fullname AS user_fullname FROM comments JOIN products ON comments.product_id = products.id JOIN users ON comments.user_id = users.id",
        (err, results) => {
            if (err) {
                console.error("Error retrieving comments:", err);
                callback(err, null);
                return;
            }
            callback(null, results);
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
            callback(null, results);
        }
    );
};

const deleteComment = (productId, callback) => {
    const query = "DELETE FROM comments WHERE id = ?";
    connection.query(query, [productId], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result);
    });
};

module.exports = {
    getAllComments,
    getAllCommentsByProductId,
    deleteComment
};
