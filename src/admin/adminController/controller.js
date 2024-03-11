const renderAdminHomePage = (req, res) => {
    res.render("index", { page: "home" }); // Render trang chính của admin
};

const renderAdminButtonPage = (req, res) => {
    res.render("index", { page: "button" }); // Render trang "about" của admin
};

const renderAdminWidgetPage = (req, res) => {
    res.render("index", { page: "widget" }); // Render trang "widget" của admin
};

const renderAdminChartPage = (req, res) => {
    res.render("index", { page: "chart" }); // Render trang "chart" của admin
};

const renderAdminTablePage = (req, res) => {
    res.render("index", { page: "table" }); // Render trang "table" của admin
};

const renderAdminTypographyPage = (req, res) => {
    res.render("index", { page: "typography" }); // Render trang "typography" của admin
};

const renderAdminElementPage = (req, res) => {
    res.render("index", { page: "element" }); // Render trang "element" của admin
};

const renderAdminFormPage = (req, res) => {
    res.render("index", { page: "form" }); // Render trang "element" của admin
};

const renderAdmin404Page = (req, res) => {
    res.render("index", { page: "404" }); // Render trang "404" của admin
};


// Biến lưu tên các trang con
const subPages = {
    productList: "productList",
    productCreate: "productCreate",
    productEdit: "productEdit",
    cateList: "cateList",
    cateCreate: "cateCreate",
    cateEdit: "cateEdit",
    orderList: "orderList",
    orderDetail: "orderDetail"
    // Thêm các trang con khác nếu cần
};

// Hàm render trang con
const renderSubPage = (req, res, subPage) => {
    res.render("index" , {page: subPage});
};


module.exports = {
    renderAdminHomePage,
    renderAdminButtonPage,
    renderAdmin404Page,
    renderAdminWidgetPage,
    renderAdminChartPage,
    renderAdminTablePage,
    renderAdminTypographyPage,
    renderAdminElementPage,
    renderAdminFormPage,
    subPages,
    renderSubPage
};
