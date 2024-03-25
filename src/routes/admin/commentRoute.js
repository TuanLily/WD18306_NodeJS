const express = require("express");
const router = express.Router();
const commnentController = require("../../controllers/admin/comment.controller");

router.get("/commentList", commnentController.renderAdminCommentPage);
router.get("/commentDelete/:id", commnentController.deleteComment);


module.exports = router;
