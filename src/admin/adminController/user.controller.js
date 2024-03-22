const userModel = require("../adminModel/userModel");


const renderUserListPage = (req, res) => {
    // Gọi hàm để lấy danh sách danh mục từ cơ sở dữ liệu
    userModel.getAllUsers((err, users) => {
        if (err) {
            // Xử lý lỗi nếu có
            console.error("Error fetching users:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        // Nếu không có lỗi, render trang và truyền danh sách danh mục vào template
        res.render("index", { page: "userList", users });
    });
};

module.exports = {
    renderUserListPage
};