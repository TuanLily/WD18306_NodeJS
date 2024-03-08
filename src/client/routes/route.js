// route.js
const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

// Route cho trang chính
router.get('/', (req, res) => {
    controller.renderHomePage(req, res, 'home');
});

// Route cho trang about
router.get('/about', (req, res) => {
    controller.renderAboutPage(req, res, 'about');
});

// Route cho trang post
router.get('/post', (req, res) => {
    controller.renderPostPage(req, res, 'post');
});
// Route cho trang cart
router.get('/cart', (req, res) => {
    controller.renderCartPage(req, res, 'cart');
});

router.get('/shop', (req, res) => {
    controller.renderShopPage(req, res, 'shop');
});
router.get('/checkout', (req, res) => {
    controller.renderCheckoutPage(req, res, 'checkout');
});
router.get('/shop-detail', (req, res) => {
    controller.renderShopDetailPage(req, res, 'shop-detail');
});
router.get('/contact', (req, res) => {
    controller.renderContactPage(req, res, 'contact');
});
router.get('/account', (req, res) => {
    controller.renderAccountPage(req, res, 'account');
});

module.exports = router;
