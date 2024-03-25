const commentModel = require("../../models/admin/commentModel");

const renderAdminCommentPage = (req, res) => {
    commentModel.getAllComments((err, comments) => {
        if (err) {
            console.error("Error fetching comments:", err);
            res.status(500).send("Internal Server Error");
        } else {
            res.render("index", { page: "commentList", comments: comments }); // Render trang "element" của admin
        }
    });
};

const deleteComment = (req, res) => {
    const commentId = req.params.id;

    commentModel.deleteComment(commentId, (err) => {
        if (err) {
            console.error("Error deleting category:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        res.redirect("/admin/commentList");
    });
};


module.exports = {
    renderAdminCommentPage,
    deleteComment
};