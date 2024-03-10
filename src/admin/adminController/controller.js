const renderAdminHomePage = (req, res) => {
    res.render("index", { page: "home" }); // Render trang chính của admin
};

const renderAdminButtonPage = (req, res) => {
    res.render("index", { page: "button" }); // Render trang "about" của admin
};

module.exports = {
    renderAdminHomePage,
    renderAdminButtonPage
};
