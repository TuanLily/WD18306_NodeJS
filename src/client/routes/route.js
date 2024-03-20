// route.js
const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");
// const { LocalStorage } = require("node-localstorage");

// const localStorage = new LocalStorage("./scratch");

// Route cho trang chính
router.get("/", (req, res) => {
    const user = req.session.user; // Lấy thông tin người dùng từ session
    controller.renderHomePage(req, res, user); // Truyền biến user vào hàm renderHomePage
});


// Route cho trang about
router.get("/about", (req, res) => {
    controller.renderAboutPage(req, res, "about");
});

// Route cho trang post
router.get("/post", (req, res) => {
    controller.renderPostPage(req, res, "post");
});
// Route cho trang cart
router.get("/cart", (req, res) => {
    controller.renderCartPage(req, res, "cart");
});

// router.get("/shop", (req, res) => {
//     controller.renderShopPage(req, res, "shop");
// });
router.get("/checkout", (req, res) => {
    controller.renderCheckoutPage(req, res, "checkout");
});
router.get("/shop-detail/:id", (req, res) => {
    const productId = req.params.id; // Lấy productId từ URL
    controller.renderShopDetailPage(req, res, "shop-detail", productId);
});

router.get("/contact", (req, res) => {
    controller.renderContactPage(req, res, "contact");
});
router.get("/account", (req, res) => {
    controller.renderAccountPage(req, res, "account");
});


router.get("/register", (req, res) => {
    controller.renderRegisterPage(req, res, "register");
});

router.get("/shop", controller.renderShopPage);

router.get("/search", controller.searchProducts);


router.get("/login", (req, res) => {
    controller.renderLoginPage(req, res, "login");
});

router.post("/login", controller.postLogin);

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
