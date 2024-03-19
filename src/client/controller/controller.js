// controller.js
const productModel = require("../model/product");
const cateModel = require("../model/category");


const renderHomePage = (req, res) => {
    cateModel.getCategoryList((err, categories) => {
        const formatPrice = (price) => {
            // Logic định dạng giá ở đây, ví dụ:
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(price);
        };

        if (err) {
            console.error("Error getting category list:", err);
            res.status(500).send("Internal Server Error");
            return;
        }

        productModel.getAllProducts((err, products) => {
            if (err) {
                console.error("Error getting product list:", err);
                res.status(500).send("Internal Server Error");
                return;
            }

            // Render trang chính và truyền dữ liệu danh mục và sản phẩm vào template
            res.render("index", { page: "home", categories, products, formatPrice });
        });
    });
};
const renderAboutPage = (req, res) => {
    res.render("index", { page: "about" }); // Render trang "about"
};

const renderPostPage = (req, res) => {
    res.render("index", { page: "post" }); // Render trang "post"
};

const renderCartPage = (req, res) => {
    res.render("index", { page: "cart" }); // Render trang "cart"
};


const renderShopPage = (req, res) => {
    // Lấy danh sách sản phẩm từ cơ sở dữ liệu
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
        // Sau khi lấy được danh sách sản phẩm, render trang "shop" với dữ liệu sản phẩm
        res.render("index", { page: "shop", products: products, formatPrice });
    });
};



const renderCheckoutPage = (req, res) => {
    res.render("index", { page: "checkout" }); // Render trang "Checkout"
};
const renderShopDetailPage = (req, res) => {
    const productId = req.params.id; // Lấy productId từ URL

    // Hàm định dạng giá
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    // Hàm lấy thông tin sản phẩm và sản phẩm ngẫu nhiên
    const getProductInfo = new Promise((resolve, reject) => {
        productModel.getProductById(productId, (err, product) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(product);
        });
    });

    const getRandomProductInfo = new Promise((resolve, reject) => {
        productModel.getRandomProducts((err, randomProduct) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(randomProduct);
        });
    });

    // Chờ cả hai hàm lấy dữ liệu hoàn thành trước khi render trang
    Promise.all([getProductInfo, getRandomProductInfo])
        .then(([product, randomProduct]) => {
            if (!product) {
                res.status(404).send("Product not found");
                return;
            }
            res.render("index", {
                page: "shop-detail",
                product: product,
                randomProduct: randomProduct,
                formatPrice: formatPrice,
            });
        })
        .catch((err) => {
            console.error("Error fetching product:", err);
            res.status(500).send("Internal Server Error");
        });
};

const renderContactPage = (req, res) => {
    res.render("index", { page: "contact" }); // Render trang "contect"
};
const renderAccountPage = (req, res) => {
    res.render("index", { page: "account" }); // Render trang "contect"
};
const renderLoginPage = (req, res) => {
    res.render("index", { page: "login" }); // Render trang "contect"
};
const renderRegisterPage = (req, res) => {
    res.render("index", { page: "register" }); // Render trang "contect"
};

module.exports = {
    renderHomePage,
    renderAboutPage,
    renderPostPage,
    renderCartPage,
    renderShopPage,
    renderCheckoutPage,
    renderShopDetailPage,
    renderContactPage,
    renderAccountPage,
    renderLoginPage,
    renderRegisterPage
};
