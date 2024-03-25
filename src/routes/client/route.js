// route.js
const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/controller");


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


router.get("/shop", controller.renderShopPage);

router.get("/search", controller.searchProducts);



module.exports = router;
