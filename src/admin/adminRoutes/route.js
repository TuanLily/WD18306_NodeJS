const express = require("express");
const router = express.Router();
const adminController = require("../adminController/controller");
const upload = require("../../config/multer.js");



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


//* Bắt đầu phần điều hướng phần danh mục
router.get("/cateList", adminController.renderCategoryListPage);
router.get("/cateCreate", adminController.renderCategoryCreatePage);
router.post("/cateCreate", adminController.addCategory);
router.get("/cateDelete/:id", adminController.deleteCategory);
// router.get("/cateEdit", adminController.renderCategoryEditPage);
// Route để hiển thị trang sửa danh mục
router.get("/cateEdit", adminController.renderCategoryEditPage);

// Route để xử lý yêu cầu cập nhật danh mục
router.post("/cateEdit", adminController.updateCategory);
//* Kết thúc phần điều hướng phần danh mục


//* Bắt đầu phần điều hướng phần sản phẩm
router.get("/productList", adminController.renderProductListPage);
router.get("/productCreate", adminController.renderProductCreatePage);
// Đường dẫn để xử lý thêm sản phẩm mới
router.post("/productCreate", upload.single("image"), adminController.addProduct);
router.get("/productDelete/:id", adminController.deleteProduct);

router.get("/productEdit", adminController.renderProductEditPage);
router.post("/productEdit", upload.single("image"), adminController.updateProduct);

//* Kết thúc phần điều hướng phần sản phẩm


//* Bắt đầu phần điều hướng phần tài khoản
router.get("/orderList", adminController.renderOrderListPage);
router.get("/orderDetail", adminController.renderOrderDetailPage);
router.get("/userList", adminController.renderUserListPage);
//* Kết thúc phần điều hướng phần tài khoản



module.exports = router;
