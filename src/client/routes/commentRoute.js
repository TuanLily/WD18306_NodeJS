const express = require("express");
const router = express.Router();
const commentRoute = require("../controller/comment.controller");

router.post("/addComment", commentRoute.addComment);


module.exports = router;