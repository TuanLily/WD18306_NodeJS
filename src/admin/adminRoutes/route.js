const express = require("express");
const router = express.Router();
const adminController = require("../adminController/controller");
// const upload = require("../../config/multer.js");



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



router.get("/orderList", adminController.renderOrderListPage);
router.get("/orderDetail", adminController.renderOrderDetailPage);





module.exports = router;
