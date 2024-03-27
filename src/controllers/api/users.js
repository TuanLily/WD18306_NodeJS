const userModel = require("../../models/admin/userModel");


exports.getAllUsers = (req, res) => {
    userModel.getAllUsers((err, users) => {
        if (err) {
            // Xử lý lỗi nếu có
            res.status(500).json({ error: "Lỗi khi lấy danh sách tài khoản." });
            return;
        }
        res.status(200).json({ data: users });
    });
};

exports.getUserById = (req, res) => {
    const categoryId = req.params.id;

    userModel.findUserById(categoryId, (err, user) => {
        if (err) {
            console.error("Error fetching user:", err);
            res.status(500).json({ error: "Lỗi khi lấy tài khoản" });
            return;
        }
        // Nếu không có lỗi, trả về thông tin danh mục qua API
        res.status(200).json({ data:user });
    });
};


exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const newData = {
        fullname: req.body.fullname,
        email: req.body.email,
        tel: req.body.tel,
        address: req.body.address,
        role: req.body.role,
        password: req.body.password
    };

    userModel.updateUser(userId, newData, (updateErr) => {
        if (updateErr) {
            console.error("Error updating user:", updateErr);
            res.status(500).send("Internal Server Error");
            return;
        }
        res.status(200).json({ message: "Thông tin người dùng đã được cập nhật." });
    });
};
