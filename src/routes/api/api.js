const express = require("express");
const router = express.Router();
const cateAPIController = require("../../controllers/api/categories");

router.get("/cateList/", cateAPIController.getAllCategories);

// request API thêm danh mục
router.post("/addCategory", cateAPIController.addCategory);

// request API xóa danh mục
router.delete("/deleteCategory/:id", cateAPIController.deleteCategory);

router.get("/category/:id", cateAPIController.getCategoryById);

// Định tuyến cho yêu cầu cập nhật danh mục qua API
router.patch("/updateCategory/:id", cateAPIController.updateCategory);


module.exports = router;