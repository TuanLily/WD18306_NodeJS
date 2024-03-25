const express = require("express");
const router = express.Router();
const userController = require("../../controllers/admin/user.controller");

//* Bắt đầu phần điều hướng phần tài khoản
router.get("/userList", userController.renderUserListPage);
router.get("/userEdit", userController.renderUserEditPage);
router.post("/userEdit", userController.updateUser);
//* Kết thúc phần điều hướng phần tài khoản



module.exports = router;
