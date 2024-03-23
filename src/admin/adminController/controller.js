
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







const renderOrderListPage = (req, res) => {
    res.render("index", { page: "orderList" });
};

const renderOrderDetailPage = (req, res) => {
    res.render("index", { page: "orderDetail" });
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


    renderOrderListPage,
    renderOrderDetailPage,



};
