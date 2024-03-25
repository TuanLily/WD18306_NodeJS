const express = require("express");
const router = express.Router();
const loginController = require("../../controllers/client/login.controller");

router.get("/login", (req, res) => {
    // Kiểm tra nếu có query parameter 'error', hiển thị thông báo lỗi
    const error = req.query.error;
    if (error === "admin_access_denied") {
        loginController.renderLoginPage(req, res, "Bạn không có quyền truy cập trang Admin.");
    } else {
        loginController.renderLoginPage(req, res);
    }
});

router.post("/login", loginController.postLogin);

router.post("/logout", (req, res) => {
    // Xóa thông tin người dùng khỏi session hoặc cookie (nếu có)
    req.session.destroy((err) => {
        if (err) {
            console.error("Error logging out:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        // Chuyển hướng người dùng đến trang chính hoặc trang đăng nhập sau khi đăng xuất thành công
        res.redirect("/");
    });
});

module.exports = router;
