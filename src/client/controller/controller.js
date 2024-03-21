// controller.js
const productModel = require("../model/product");
const cateModel = require("../model/category");
const userModel = require("../model/user");


const bcrypt = require("bcrypt");
const saltRounds = 10;


const renderHomePage = (req, res) => {
    const user = req.session.user;
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
            res.render("index", { page: "home", user: user, categories, products, formatPrice });
        });
    });
};


const renderAboutPage = (req, res) => {
    res.render("index", { page: "about", user: req.session.user }); // Render trang "about"
};

const renderPostPage = (req, res) => {
    res.render("index", { page: "post", user: req.session.user }); // Render trang "post"
};

const renderCartPage = (req, res) => {
    res.render("index", { page: "cart", user: req.session.user }); // Render trang "cart"
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
        res.render("index", { page: "shop", user: req.session.user, products: products, formatPrice });
    });
};



const renderCheckoutPage = (req, res) => {
    res.render("index", { page: "checkout", user: req.session.user }); // Render trang "Checkout"
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
                page: "shop-detail", user: req.session.user,
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
    res.render("index", { page: "contact", user: req.session.user }); // Render trang "contect"
};
const renderAccountPage = (req, res) => {
    res.render("index", { page: "account", user: req.session.user }); // Render trang "contect"
};

const renderLoginPage = (req, res) => {
    res.render("index", { page: "login" }); // Render trang "contect"
};

const postLogin = (req, res) => {
    const { email, password } = req.body;

    userModel.loginUser(email, password, (error, user) => {
        if (error) {
            const errorMessage = "Có lỗi xảy ra khi đăng nhập.";
            return res.render("index", { page: "login", errorMessage });
        }

        if (!user) {
            const errorMessage = "Email hoặc mật khẩu không đúng.";
            return res.render("index", { page: "login", errorMessage });
        }

        req.session.user = user;
        res.redirect("/");
    });
};




const renderRegisterPage = (req, res) => {
    res.render("index", { page: "register" });
};

const addNewUser = (req, res) => {
    const { fullname, email, password, isPassword } = req.body;

    // Kiểm tra xem các trường dữ liệu có bị trống không và ghi nhận lỗi tương ứng
    if (!fullname || !email || !password || !isPassword) {
        return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin tài khoản." });
    }

    // Kiểm tra xem hai mật khẩu có khớp nhau không và ghi nhận lỗi
    if (password !== isPassword) {
        return res.status(400).json({ error: "Mật khẩu xác nhận không khớp" });
    }

    // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu hay chưa
    userModel.getUserByEmail(email, (error, existingUser) => {
        if (error) {
            return res.status(500).json({ error: "Lỗi trong quá trình truy vấn cơ sở dữ liệu." });
        }

        if (existingUser) {
            return res.status(400).json({ error: "Email đã tồn tại trong hệ thống." });
        }

        // Mã hóa mật khẩu
        bcrypt.hash(password, saltRounds, (hashError, hashedPassword) => {
            if (hashError) {
                return res.status(500).json({ error: "Lỗi trong quá trình mã hóa mật khẩu." });
            }

            // Thêm tài khoản mới với mật khẩu đã được mã hóa
            userModel.addUser(fullname, email, hashedPassword, (addError) => {
                if (addError) {
                    return res.status(500).json({ error: "Lỗi trong quá trình thêm tài khoản." });
                } else {
                    res.redirect("/login"); // Chuyển hướng sau khi đăng ký thành công
                }

            });
        });
    });
};






const searchProducts = (req, res) => {
    // Lấy từ khóa tìm kiếm từ request body hoặc query parameters
    const keyword = req.body.keyword || req.query.keyword;
    // Gọi hàm từ model để tìm kiếm sản phẩm dựa trên từ khóa
    productModel.getProductsByKeyWord(keyword, (err, products) => {
        if (err) {
            // Xử lý lỗi nếu có
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }

        // Trả về kết quả tìm kiếm cho client
        res.status(200).json({ success: true, products: products });
    });
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


    searchProducts,

    renderLoginPage,
    postLogin,

    renderRegisterPage,
    addNewUser

};
