const express = require("express");
const router = express.Router();
const cateAPIController = require("../../controllers/api/categories");
const productsAPIController = require("../../controllers/api/products");
const upload = require("../../config/multer.js");

router.get("/cateList/", cateAPIController.getAllCategories);

// request API thêm danh mục
router.post("/addCategory", cateAPIController.addCategory);

// request API xóa danh mục
router.delete("/deleteCategory/:id", cateAPIController.deleteCategory);

router.get("/category/:id", cateAPIController.getCategoryById);

// Định tuyến cho yêu cầu cập nhật danh mục qua API
router.patch("/updateCategory/:id", cateAPIController.updateCategory);


router.get("/productList/", productsAPIController.getAllProducts);

router.post("/addProduct", upload.single("image"), productsAPIController.addProduct);

router.delete("/deleteProduct/:id", productsAPIController.deleteProduct);

router.get("/product/:id", productsAPIController.getProductById);

router.patch("/updateProduct/:id", upload.single("image"), productsAPIController.updateProduct);






module.exports = router;