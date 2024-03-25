const cateModel = require("../../models/admin/cateModel");


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

module.exports = {
    renderCategoryListPage,
    renderCategoryCreatePage,
    addCategory,
    deleteCategory,
    renderCategoryEditPage,
    updateCategory
};