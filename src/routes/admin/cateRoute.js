const express = require("express");
const router = express.Router();
const cateController = require("../../controllers/admin/cate.controller");

//* Bắt đầu phần điều hướng phần danh mục
router.get("/cateList", cateController.renderCategoryListPage);
router.get("/cateCreate", cateController.renderCategoryCreatePage);
router.post("/cateCreate", cateController.addCategory);
router.get("/cateDelete/:id", cateController.deleteCategory);
// router.get("/cateEdit", cateController.renderCategoryEditPage);
// Route để hiển thị trang sửa danh mục
router.get("/cateEdit", cateController.renderCategoryEditPage);

// Route để xử lý yêu cầu cập nhật danh mục
router.post("/cateEdit", cateController.updateCategory);
//* Kết thúc phần điều hướng phần danh mục


module.exports = router;
