const express = require("express");
const router = express.Router();
const userController = require("../adminController/user.controller");

//* Bắt đầu phần điều hướng phần tài khoản
router.get("/userList", userController.renderUserListPage);
//* Kết thúc phần điều hướng phần tài khoản



module.exports = router;
