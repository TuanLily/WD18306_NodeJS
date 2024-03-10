const express = require("express");
const router = express.Router();
const adminController = require("../adminController/controller");

// Route cho trang chính của admin
router.get("/", (req, res) => {
    adminController.renderAdminHomePage(req, res, "home");
});

// Route cho trang about
router.get("/button", (req, res) => {
    adminController.renderAdminButtonPage(req, res, "button");
});

module.exports = router;

