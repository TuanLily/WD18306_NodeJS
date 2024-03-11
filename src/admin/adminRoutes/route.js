const express = require("express");
const router = express.Router();
const adminController = require("../adminController/controller");

// Route cho trang chính của admin
router.get("/", (req, res) => {
    adminController.renderAdminHomePage(req, res, "home");
});

router.get("/button", (req, res) => {
    adminController.renderAdminButtonPage(req, res, "button");
});

router.get("/chart", (req, res) => {
    adminController.renderAdminChartPage(req, res, "chart");
});

router.get("/widget", (req, res) => {
    adminController.renderAdminWidgetPage(req, res, "widget");
});

router.get("/table", (req, res) => {
    adminController.renderAdminTablePage(req, res, "table");
});

router.get("/typography", (req, res) => {
    adminController.renderAdminTypographyPage(req, res, "typography");
});

router.get("/element", (req, res) => {
    adminController.renderAdminElementPage(req, res, "element");
});
router.get("/form", (req, res) => {
    adminController.renderAdminFormPage(req, res, "form");
});

router.get("/404", (req, res) => {
    adminController.renderAdmin404Page(req, res, "404");
});

router.get("/cate-list", (req, res) => {
    adminController.renderSubPage(req, res, "cate-list");
});

router.get("/:subPage", (req, res) => {
    const subPage = req.params.subPage;
    // eslint-disable-next-line no-prototype-builtins
    if (adminController.subPages.hasOwnProperty(subPage)) {
        adminController.renderSubPage(req, res, adminController.subPages[subPage]);
    } else {
        // Xử lý nếu trang con không tồn tại
        adminController.renderAdminHomePage(req, res, "home");
    }
});


module.exports = router;
