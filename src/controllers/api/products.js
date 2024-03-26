const cateModel = require("../../models/admin/cateModel");
const productModel = require("../../models/admin/productModel");
const fs = require("fs");
const path = require("path");

exports.getAllProducts = (req, res) => {
    productModel.getAllProducts((err, products) => {
        if (err) {
            console.error("Error fetching products:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        res.status(200).json({ data: products });
    });
};

exports.addProduct = (req, res) => {
    const { name, price, image, sale_price, description, categoryId } = req.body;
    // const image = req.file.filename; // Đảm bảo rằng bạn đã sử dụng middleware Multer để xử lý tệp tải lên trong tệp route của bạn

    productModel.addProduct(name, image, price, sale_price, description, categoryId, (err) => {
        if (err) {
            console.error("Error adding product:", err);
            res.status(500).json({ error: "Lỗi khi thêm sản phẩm." });
            return;
        }
        res.status(200).json({ message: "Sản phẩm đã được thêm thành công." });
    });
};

exports.deleteProduct = (req, res) => {
    // Lấy productId từ tham số trong URL
    const productId = req.params.id;

    // Gọi hàm để lấy thông tin sản phẩm từ cơ sở dữ liệu
    productModel.getProductById(productId, (err, product) => {
        if (err) {
            console.error("Error getting product:", err);
            res.status(500).send("Internal Server Error");
            return;
        }

        if (!product) {
            res.status(404).send("Product not found");
            return;
        }

        // Khai báo đường dẫn của thư mục uploads
        const uploadDir = path.resolve(__dirname, "../../uploads");

        // Xóa file ảnh từ thư mục upload
        fs.unlink(`${uploadDir}/${product.image}`, (err) => {
            if (err) {
                console.error("Error deleting image:", err);
                res.status(500).send("Internal Server Error");
                return;
            }

            // Gọi hàm để xóa sản phẩm từ cơ sở dữ liệu
            productModel.deleteProduct(productId, (err) => {
                if (err) {
                    console.error("Error deleting product:", err);
                    res.status(500).send("Internal Server Error");
                    return;
                }

                res.status(200).json({ message: "Sản phẩm xóa thành công." });
            });
        });
    });
};

exports.getProductById = (req, res) => {
    const productId = req.params.id;

    if (productId) {
        productModel.getProductById(productId, (err, product) => {
            if (err) {
                console.error("Error fetching product:", err);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            if (!product) {
                res.status(404).json({ error: "Product not found" });
                return;
            }
            cateModel.getCategoryList((err, categories) => {
                if (err) {
                    console.error("Error fetching product:", err);
                    res.status(500).json({ error: "Internal Server Error" });
                    return;
                }
                res.status(200).json({ data: product, categories: categories });
            });
        });
    } else {
        res.status(400).json({ error: "Product ID is required" });
    }
};


exports.updateProduct = (req, res) => {
    const productId = req.params.id;
    const newData = {
        name: req.body.name,
        price: req.body.price,
        sale_price: req.body.sale_price,
        description: req.body.description,
        cate_id: req.body.cate_id,
        image: req.body.image
    };

    productModel.updateProduct(productId, newData, (updateErr) => {
        if (updateErr) {
            console.error("Error updating product:", updateErr);
            res.status(500).send("Internal Server Error");
            return;
        }
        res.status(200).json({ message: "Sản phẩm cập nhật thành công." });
    });
};
