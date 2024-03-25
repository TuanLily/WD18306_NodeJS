const commentModel = require("../../models/client/comment");

const getCommentsForProduct = (productId, callback) => {
    commentModel.getAllCommentsByProductId(productId, (err, comments) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, comments);
        }
    });
};

const addComment = (req, res) => {
    const { user_id, product_id, content } = req.body;

    commentModel.addComment(user_id, product_id, content, (err, commentId) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.status(201).json({ success: true, commentId });
    });
};



module.exports = {
    getCommentsForProduct,
    addComment,
};