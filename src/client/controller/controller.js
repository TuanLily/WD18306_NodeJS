// controller.js
const productModel = require("../model/product");


const renderHomePage = (req, res) => {
    res.render("index", { page: "home" }); // Render trang chính
};

const renderAboutPage = (req, res) => {
    res.render("index", { page: "about" }); // Render trang "about"
};

const renderPostPage = (req, res) => {
    res.render("index", { page: "post" }); // Render trang "post"
};

const renderCartPage = (req, res) => {
    res.render("index", { page: "cart" }); // Render trang "cart"
};


const renderShopPage = (req, res) => {
    // Lấy danh sách sản phẩm từ cơ sở dữ liệu
    productModel.getAllProducts((err, products) => {
        const formatPrice = (price) => {
            // Logic định dạng giá ở đây, ví dụ:
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(price);
        };
        if (err) {
            console.error("Error fetching products:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        // Sau khi lấy được danh sách sản phẩm, render trang "shop" với dữ liệu sản phẩm
        res.render("index", { page: "shop", products: products, formatPrice });
    });
};



const renderCheckoutPage = (req, res) => {
    res.render("index", { page: "checkout" }); // Render trang "Checkout"
};
const renderShopDetailPage = (req, res) => {
    res.render("index", { page: "shop-detail" }); // Render trang "shop-detail"
};
const renderContactPage = (req, res) => {
    res.render("index", { page: "contact" }); // Render trang "contect"
};
const renderAccountPage = (req, res) => {
    res.render("index", { page: "account" }); // Render trang "contect"
};
const renderLoginPage = (req, res) => {
    res.render("index", { page: "login" }); // Render trang "contect"
};
const renderRegisterPage = (req, res) => {
    res.render("index", { page: "register" }); // Render trang "contect"
};

module.exports = {
    renderHomePage,
    renderAboutPage,
    renderPostPage,
    renderCartPage,
    renderShopPage,
    renderCheckoutPage,
    renderShopDetailPage,
    renderContactPage,
    renderAccountPage,
    renderLoginPage,
    renderRegisterPage
};
