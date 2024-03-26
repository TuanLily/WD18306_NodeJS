// Hàm render trang danh sách danh mục
const renderCategoryListPage = (req, res) => {
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
            res.render("index", { page: "cateList", categories });
        })
        .catch(err => {
            console.error("Error", err);
            res.status(500).send("Internal Server Error");
        });
};

// Hàm render trang thêm mới danh mục
const renderCategoryCreatePage = (req, res) => {
    res.render("index", { page: "cateCreate" });
};



// Hàm thêm mới danh mục
const addCategory = (req, res) => {
    const DB_HOST = process.env.DB_HOST || "localhost";
    const PORT = process.env.PORT || "8888";
    const { name } = req.body;

    const apiUrl = `http://${DB_HOST}:${PORT}/admin/api/addCategory`;

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Fetch request failed");
            }
            // Nếu request thành công, chuyển hướng người dùng đến trang danh sách danh mục
            res.redirect("/admin/cateList");
        })
        .catch(err => {
            // Xử lý lỗi nếu có
            console.error("Error adding category:", err);
            res.status(500).send("Internal Server Error");
        });
};

// Hàm xóa danh mục
const deleteCategory = (req, res) => {
    const DB_HOST = process.env.DB_HOST || "localhost";
    const PORT = process.env.PORT || "8888";
    const categoryId = req.params.id; // Lấy categoryId từ URL

    const apiUrl = `http://${DB_HOST}:${PORT}/admin/api/deleteCategory/${categoryId}`;

    fetch(apiUrl, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Fetch request failed");
            }
            res.redirect("/admin/cateList");
        })
        .catch(err => {
            console.error("Error deleting category:", err);
            res.status(500).send("Internal Server Error");
        });
};
// Hàm render trang sửa danh mục
const renderCategoryEditPage = (req, res) => {
    const DB_HOST = process.env.DB_HOST || "localhost";
    const PORT = process.env.PORT || "8888";
    const categoryId = req.query.id;

    const apiUrl = `http://${DB_HOST}:${PORT}/admin/api/category/${categoryId}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Fetch request failed");
            }
            return response.json();
        })
        .then(data => {
            res.render("index", { page: "cateEdit", category: data.data });
        })
        .catch(err => {
            console.error("Error fetching category:", err);
            res.status(500).send("Internal Server Error");
        });
};

//  Hàm xử lý yêu cầu cập nhật danh mục
const updateCategory = (req, res) => {
    const DB_HOST = process.env.DB_HOST || "localhost";
    const PORT = process.env.PORT || "8888";
    const categoryId = req.query.id;
    const newData = { name: req.body.name };
    // Xây dựng URL cho request API
    const apiUrl = `http://${DB_HOST}:${PORT}/admin/api/updateCategory/${categoryId}`;

    fetch(apiUrl, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Fetch request failed");
            }
            res.redirect("/admin/cateList");
        })
        .catch(err => {
            console.error("Error updating category:", err);
            res.status(500).send("Internal Server Error");
        });
};


module.exports = {
    renderCategoryListPage,
    renderCategoryCreatePage,
    addCategory,
    deleteCategory,
    renderCategoryEditPage,
    updateCategory
};