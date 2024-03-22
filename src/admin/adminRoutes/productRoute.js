const express = require("express");
const router = express.Router();
const productController = require("../adminController/product.controller");
const upload = require("../../config/multer.js");


//* Bắt đầu phần điều hướng phần sản phẩm
router.get("/productList", productController.renderProductListPage);
router.get("/productCreate", productController.renderProductCreatePage);
// Đường dẫn để xử lý thêm sản phẩm mới
router.post("/productCreate", upload.single("image"), productController.addProduct);
router.get("/productDelete/:id", productController.deleteProduct);

router.get("/productEdit", productController.renderProductEditPage);
router.post("/productEdit", upload.single("image"), productController.updateProduct);

//* Kết thúc phần điều hướng phần sản phẩm

module.exports = router;
