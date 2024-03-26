// api/categories.js

const cateModel = require("../../models/admin/cateModel");


exports.getAllCategories = (req, res) => {
    cateModel.getCategoryList((err, categories) => {
        if (err) {
            // Xử lý lỗi nếu có
            res.status(500).json({ error: "Lỗi khi lấy danh sách danh mục." });
            return;
        }
        // Nếu không có lỗi, gửi danh sách danh mục trong phản hồi JSON
        res.status(200).json({ data: categories });
    });
};

// Hàm xử lý request API thêm danh mục
exports.addCategory = (req, res) => {
    const { name } = req.body;

    // Thêm danh mục vào cơ sở dữ liệu
    cateModel.addCategory(name, (err) => {
        if (err) {
            // Xử lý lỗi nếu có
            console.error("Error adding category:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        // Nếu không có lỗi, gửi phản hồi thành công
        res.status(200).json({ message: "Danh mục đã được thêm thành công." });
    });
};

exports.deleteCategory = (req, res) => {
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
        res.status(200).json({ message: "Danh mục đã được xóa thành công" });

    });
};

exports.getCategoryById = (req, res) => {
    const categoryId = req.params.id;

    cateModel.getCategoryById(categoryId, (err, category) => {
        if (err) {
            console.error("Error fetching category:", err);
            res.status(500).json({ error: "Lỗi khi lấy danh mục." });
            return;
        }
        // Nếu không có lỗi, trả về thông tin danh mục qua API
        res.status(200).json({ data:category });
    });
};

// Hàm xử lý yêu cầu cập nhật danh mục qua API
exports.updateCategory = (req, res) => {
    const categoryId = req.params.id;
    const newData = { name: req.body.name };

    cateModel.updateCategory(categoryId, newData, (err) => {
        if (err) {
            console.error("Error updating category:", err);
            res.status(500).json({ error: "Lỗi khi cập nhật danh mục." });
            return;
        }
        res.status(200).json({ message: "Danh mục đã được cập nhật thành công." });
    });
};