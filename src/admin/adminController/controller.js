const cateModel = require("../adminModel/cateModel");
const productModel = require("../adminModel/productModel");
const fs = require("fs");
const path = require("path");

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


const renderProductListPage = (req, res) => {
    productModel.getAllProducts((err, products) => {
        const formatPrice = (price) => {
            // Logic định dạng giá ở đây, ví dụ:
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(price);
        };
        if (err) {
            console.error("Error fetching products:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        res.render("index", { page: "productList", products, formatPrice });
    });
};

const renderProductCreatePage = (req, res) => {
    // Gọi hàm để lấy danh sách danh mục từ cơ sở dữ liệu
    cateModel.getCategoryList((err, categories) => {
        if (err) {
            console.error("Error fetching categories:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        res.render("index", { page: "productCreate", categories });
    });
};

const addProduct = (req, res) => {
    // Lấy thông tin sản phẩm từ body của request
    const { name, price, sale_price, description, categoryId } = req.body;

    // Xử lý ảnh upload bằng Multer
    const image = req.file.filename; // Đường dẫn của ảnh đã upload

    // Gọi hàm để thêm sản phẩm vào cơ sở dữ liệu
    productModel.addProduct(name, image, price, sale_price, description, categoryId, (err) => {
        if (err) {
            console.error("Error adding product:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        res.redirect("/admin/productList");
    });
};

// Hàm xóa sản phẩm
const deleteProduct = (req, res) => {
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

                res.redirect("/admin/productList");
            });
        });
    });
};

const renderProductEditPage = (req, res) => {
    // Lấy productId từ query parameters
    const productId = req.query.id;

    if (productId) {
        // Trang hiện tại đang ở đường dẫn /productEdit?id=:id
        // Gọi hàm để lấy thông tin sản phẩm từ cơ sở dữ liệu
        productModel.getProductById(productId, (err, product) => {
            if (err) {
                // Xử lý lỗi nếu có
                console.error("Error fetching product:", err);
                res.status(500).send("Internal Server Error");
                return;
            }
            if (!product) {
                res.status(404).send("Product not found");
                return;
            }
            // Nếu không có lỗi, tiếp tục lấy danh sách danh mục từ cơ sở dữ liệu
            cateModel.getCategoryList((err, categories) => {
                if (err) {
                    // Xử lý lỗi nếu có
                    console.error("Error fetching categories:", err);
                    res.status(500).send("Internal Server Error");
                    return;
                }
                // Nếu không có lỗi, render trang và truyền thông tin sản phẩm và danh sách danh mục vào template
                res.render("index", { page: "productEdit", product: product, categories: categories });
            });
        });
    } else {
        // Trang hiện tại không có productId trong query parameters
        // Thực hiện logic tương ứng
        res.render("index", { page: "productEdit" });
    }
};

// Hàm xử lý yêu cầu cập nhật sản phẩm
const updateProduct = (req, res) => {
    const productId = req.query.id;
    const newData = {
        name: req.body.name,
        price: req.body.price,
        sale_price: req.body.sale_price,
        description: req.body.description,
        cate_id: req.body.cate_id
    };
    // Kiểm tra xem có file ảnh mới được tải lên hay không
    if (!req.file) {
        // Nếu không có ảnh mới, lấy thông tin sản phẩm từ cơ sở dữ liệu
        productModel.getProductById(productId, (err, product) => {
            if (err) {
                console.error("Error fetching product:", err);
                res.status(500).send("Internal Server Error");
                return;
            }
            newData.image = product.image;

            productModel.updateProduct(productId, newData, (updateErr) => {
                if (updateErr) {
                    console.error("Error updating product:", updateErr);
                    res.status(500).send("Internal Server Error");
                    return;
                }
                res.redirect("/admin/productList");
            });
        });
    } else {
        // Nếu có chọn ảnh mới, cập nhật đường dẫn ảnh mới
        newData.image = req.file.filename;

        productModel.updateProduct(productId, newData, (updateErr) => {
            if (updateErr) {
                console.error("Error updating product:", updateErr);
                res.status(500).send("Internal Server Error");
                return;
            }
            res.redirect("/admin/productList");
        });
    }
};




const renderCategoryListPage = (req, res) => {
    // Gọi hàm để lấy danh sách danh mục từ cơ sở dữ liệu
    cateModel.getCategoryList((err, categories) => {
        if (err) {
            // Xử lý lỗi nếu có
            console.error("Error fetching categories:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        // Nếu không có lỗi, render trang và truyền danh sách danh mục vào template
        res.render("index", { page: "cateList", categories });
    });
};


const renderCategoryCreatePage = (req, res) => {
    res.render("index", { page: "cateCreate" });
};

const addCategory = (req, res) => {
    const { name } = req.body;

    // Gọi hàm để thêm danh mục vào cơ sở dữ liệu
    cateModel.addCategory(name, (err) => {
        if (err) {
            // Xử lý lỗi nếu có
            console.error("Error adding category:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        // Nếu không có lỗi, chuyển hướng người dùng đến trang danh sách danh mục
        res.redirect("/admin/cateList");
    });
};

// Hàm xóa danh mục
const deleteCategory = (req, res) => {
    // Lấy categoryId từ tham số trong URL
    const categoryId = req.params.id;

    // Gọi hàm để xóa danh mục từ cơ sở dữ liệu
    cateModel.deleteCategory(categoryId, (err) => {
        if (err) {
            // Xử lý lỗi nếu có
            console.error("Error deleting category:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        // Nếu không có lỗi, redirect lại trang danh sách danh mục
        res.redirect("/admin/cateList");
    });
};

// Hàm render trang sửa danh mục
const renderCategoryEditPage = (req, res) => {
    // Lấy categoryId từ query parameters
    const categoryId = req.query.id;

    if (categoryId) {
        // Trang hiện tại đang ở đường dẫn /cateEdit?id=:id
        // Gọi hàm để lấy thông tin danh mục từ cơ sở dữ liệu
        cateModel.getCategoryById(categoryId, (err, category) => {
            if (err) {
                // Xử lý lỗi nếu có
                console.error("Error fetching category:", err);
                res.status(500).send("Internal Server Error");
                return;
            }
            // Nếu không có lỗi, render trang và truyền thông tin danh mục vào template
            res.render("index", { page: "cateEdit", category });
        });
    } else {
        // Trang hiện tại đang ở đường dẫn /cateEdit
        // Thực hiện logic tương ứng
        res.render("index", { page: "cateEdit" });
    }
};

//  Hàm xử lý yêu cầu cập nhật danh mục
const updateCategory = (req, res) => {
    // Lấy thông tin từ body của request
    const categoryId = req.query.id;
    const newData = { name: req.body.name }; // Tạo object mới chứa dữ liệu cần cập nhật

    // Gọi hàm để cập nhật danh mục trong cơ sở dữ liệu
    cateModel.updateCategory(categoryId, newData, (err) => {
        if (err) {
            // Xử lý lỗi nếu có
            console.error("Error updating category:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        // Nếu không có lỗi, redirect lại trang danh sách danh mục
        res.redirect("/admin/cateList");
    });
};




const renderOrderListPage = (req, res) => {
    res.render("index", { page: "orderList" });
};

const renderOrderDetailPage = (req, res) => {
    res.render("index", { page: "orderDetail" });
};

const renderUserListPage = (req, res) => {
    res.render("index", { page: "userList" });
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
    renderUserListPage,

    renderCategoryListPage,
    renderCategoryCreatePage,
    addCategory,
    deleteCategory,
    renderCategoryEditPage,
    updateCategory,


    renderProductListPage,
    renderProductCreatePage,
    addProduct,
    deleteProduct,
    renderProductEditPage,
    updateProduct
};
