
const renderProductListPage = (req, res) => {
    const DB_HOST = process.env.DB_HOST || "localhost";
    const PORT = process.env.PORT || "8888";

    const apiUrl = `http://${DB_HOST}:${PORT}/admin/api/productList/`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Fetch request failed");
            }
            return response.json();
        })
        .then(data => {
            const formatPrice = (price) => {
                // Logic định dạng giá ở đây, ví dụ:
                return new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(price);
            };
            const products = data.data;
            res.render("index", { page: "productList", products, formatPrice });
        })
        .catch(err => {
            console.error("Error", err);
            res.status(500).send("Internal Server Error");
        });
};


const renderProductCreatePage = (req, res) => {
    const DB_HOST = process.env.DB_HOST || "localhost";
    const PORT = process.env.PORT || "8888";

    const apiUrl = `http://${DB_HOST}:${PORT}/admin/api/cateList/`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Fetch request failed");
            }
            return response.json();
        })
        .then(data => {
            const categories = data.data;
            res.render("index", { page: "productCreate", categories });
        })
        .catch(err => {
            console.error("Error", err);
            res.status(500).send("Internal Server Error");
        });
};


// Hàm xóa sản phẩm

const addProduct = (req, res) => {
    const DB_HOST = process.env.DB_HOST || "localhost";
    const PORT = process.env.PORT || "8888";
    console.log(req.file);

    // Lấy thông tin sản phẩm từ body của request
    const { name, price, sale_price, description, categoryId } = req.body;
    // Xử lý ảnh upload bằng Multer
    const image = req.file.filename; // Đường dẫn của ảnh đã upload
    // res.send(req.body);
    // // Xây dựng URL cho request API
    const apiUrl = `http://${DB_HOST}:${PORT}/admin/api/addProduct`;

    // Gửi request POST đến API để thêm sản phẩm
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, image, price, sale_price, description, categoryId })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Fetch request failed");
            }
            // Nếu request thành công, chuyển hướng người dùng đến trang danh sách sản phẩm
            res.redirect("/admin/productList");
        })
        .catch(err => {
            // Xử lý lỗi nếu có
            console.error("Error adding product:", err);
            res.status(500).send("Internal Server Error");
        });
};


const deleteProduct = (req, res) => {
    const DB_HOST = process.env.DB_HOST || "localhost";
    const PORT = process.env.PORT || "8888";
    const productId = req.params.id; // Lấy productId từ URL

    const apiUrl = `http://${DB_HOST}:${PORT}/admin/api/deleteProduct/${productId}`;

    fetch(apiUrl, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Fetch request failed");
            }
            res.redirect("/admin/productList");
        })
        .catch(err => {
            console.error("Error deleting product:", err);
            res.status(500).send("Internal Server Error");
        });
};


const renderProductEditPage = (req, res) => {
    const DB_HOST = process.env.DB_HOST || "localhost";
    const PORT = process.env.PORT || "8888";
    const productId = req.query.id;

    if (!productId) {
        res.status(400).json({ error: "Product ID is required" });
        return;
    }

    const productUrl = `http://${DB_HOST}:${PORT}/admin/api/product/${productId}`;
    const categoriesUrl = `http://${DB_HOST}:${PORT}/admin/api/cateList`;

    Promise.all([
        fetch(productUrl),
        fetch(categoriesUrl)
    ])
        .then(responses => {
            return Promise.all(responses.map(response => response.json()));
        })
        .then(data => {
            const productData = data[0];
            const categoriesData = data[1];
            res.render("index", { page: "productEdit", product: productData.data, categories: categoriesData.data });
        })
        .catch(err => {
            console.error("Error fetching product or categories:", err);
            res.status(500).send("Internal Server Error");
        });
};


// Hàm xử lý yêu cầu cập nhật sản phẩm

const updateProduct = async (req, res) => {
    const DB_HOST = process.env.DB_HOST || "localhost";
    const PORT = process.env.PORT || "8888";
    const productId = req.query.id; // Lấy productId từ params
    const { name, price, sale_price, description, cate_id } = req.body;

    // Kiểm tra xem có file ảnh mới được tải lên hay không
    const image = req.file ? req.file.filename : "";

    try {
        // Tạo object newData để chứa dữ liệu mới
        const newData = { name, price, sale_price, description, cate_id };

        // Nếu không có ảnh mới, lấy thông tin sản phẩm từ API
        if (!image) {
            const apiUrlGetProduct = `http://${DB_HOST}:${PORT}/admin/api/product/${productId}`;
            const response = await fetch(apiUrlGetProduct);
            if (!response.ok) {
                throw new Error("Fetch request failed");
            }
            const product = await response.json();
            newData.image = product.data.image;
        } else {
            newData.image = image;
        }

        // Xây dựng URL cho request API
        const apiUrlUpdate = `http://${DB_HOST}:${PORT}/admin/api/updateProduct/${productId}`;

        // Gửi request PATCH đến API để cập nhật sản phẩm
        const updateResponse = await fetch(apiUrlUpdate, {
            method: "PATCH", // Sử dụng phương thức PATCH cho việc cập nhật sản phẩm
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData) // Gửi dữ liệu mới
        });

        if (!updateResponse.ok) {
            throw new Error("Fetch request failed");
        }

        // Nếu request thành công, chuyển hướng người dùng đến trang danh sách sản phẩm
        res.redirect("/admin/productList");
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Error updating product:", error);
        res.status(500).send("Internal Server Error");
    }
};





module.exports = {
    renderProductListPage,
    renderProductCreatePage,
    addProduct,
    deleteProduct,
    renderProductEditPage,
    updateProduct
};