// controller.js
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
    res.render("index", { page: "shop" }); // Render trang "shop"
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
