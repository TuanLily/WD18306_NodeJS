const userModel = require("../adminModel/userModel");
const bcrypt = require("bcrypt");


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

const renderUserEditPage = (req, res) => {
    const userId = req.query.id;
    // res.send(userId);
    userModel.findUserById(userId, (err, user) => {
        if (err) {
            console.error("Error finding user by id:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.render("index", { page: "userEdit", user: user });
    });
};

const updateUser = (req, res) => {
    const userId = req.query.id;
    const newData = {
        fullname: req.body.fullname,
        email: req.body.email,
        tel: req.body.tel,
        address: req.body.address,
        role: req.body.role
    };

    // Kiểm tra xem có cập nhật mật khẩu mới không
    if (!req.body.password) {
        // Nếu không có mật khẩu mới, lấy mật khẩu từ người dùng hiện tại trong cơ sở dữ liệu
        userModel.findUserById(userId, (err, user) => {
            if (err) {
                console.error("Error fetching user:", err);
                res.status(500).send("Internal Server Error");
                return;
            }
            // Sử dụng mật khẩu từ người dùng hiện tại để cập nhật
            newData.password = user.password;

            console.log(">>> check old pass: ", newData.password);

            // Gọi hàm updateUser từ model để cập nhật thông tin người dùng
            userModel.updateUser(userId, newData, (updateErr) => {
                if (updateErr) {
                    console.error("Error updating user:", updateErr);
                    res.status(500).json({ error: "Internal server error" });
                    return;
                }
                res.redirect("/admin/userList");
            });
        });
    } else {
        // Nếu có mật khẩu mới, mã hóa nó bằng bcrypt
        bcrypt.hash(req.body.password, 10, (hashErr, hashedPassword) => {
            if (hashErr) {
                console.error("Error hashing password:", hashErr);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            // Cập nhật mật khẩu mới đã mã hóa vào newData
            newData.password = hashedPassword;
            console.log(">>> check new pass: ",newData.password);

            // Gọi hàm updateUser từ model để cập nhật thông tin người dùng
            userModel.updateUser(userId, newData, (updateErr) => {
                if (updateErr) {
                    console.error("Error updating user:", updateErr);
                    res.status(500).json({ error: "Internal server error" });
                    return;
                }
                res.redirect("/admin/userList");
            });
        });
    }
};



module.exports = {
    renderUserListPage,
    renderUserEditPage,
    updateUser
};