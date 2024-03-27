const bcrypt = require("bcrypt");


// const renderUserListPage = (req, res) => {
//     // Gọi hàm để lấy danh sách danh mục từ cơ sở dữ liệu
//     userModel.getAllUsers((err, users) => {
//         if (err) {
//             // Xử lý lỗi nếu có
//             console.error("Error fetching users:", err);
//             res.status(500).send("Internal Server Error");
//             return;
//         }
//         // Nếu không có lỗi, render trang và truyền danh sách danh mục vào template
//         res.render("index", { page: "userList", users });
//     });
// };
const renderUserListPage = (req, res) => {
    const DB_HOST = process.env.DB_HOST || "localhost";
    const PORT = process.env.PORT || "8888";

    const apiUrl = `http://${DB_HOST}:${PORT}/admin/api/userList/`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Fetch request failed");
            }
            return response.json();
        })
        .then(data => {
            const users = data.data;
            res.render("index", { page: "userList", users });
        })
        .catch(err => {
            console.error("Error", err);
            res.status(500).send("Internal Server Error");
        });
};

// const renderUserEditPage = (req, res) => {
//     const userId = req.query.id;
//     // res.send(userId);
//     userModel.findUserById(userId, (err, user) => {
//         if (err) {
//             console.error("Error finding user by id:", err);
//             res.status(500).json({ error: "Internal server error" });
//             return;
//         }
//         if (!user) {
//             res.status(404).json({ message: "User not found" });
//             return;
//         }
//         res.render("index", { page: "userEdit", user: user });
//     });
// };
const renderUserEditPage = (req, res) => {
    const DB_HOST = process.env.DB_HOST || "localhost";
    const PORT = process.env.PORT || "8888";
    const userId = req.query.id;

    const apiUrl = `http://${DB_HOST}:${PORT}/admin/api/user/${userId}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Fetch request failed");
            }
            return response.json();
        })
        .then(data => {
            res.render("index", { page: "userEdit", user: data.data });
        })
        .catch(err => {
            console.error("Error fetching user:", err);
            res.status(500).send("Internal Server Error");
        });
};

// const updateUser = (req, res) => {
//     const userId = req.query.id;
//     const newData = {
//         fullname: req.body.fullname,
//         email: req.body.email,
//         tel: req.body.tel,
//         address: req.body.address,
//         role: req.body.role
//     };

//     // Kiểm tra xem có cập nhật mật khẩu mới không
//     if (!req.body.password) {
//         // Nếu không có mật khẩu mới, lấy mật khẩu từ người dùng hiện tại trong cơ sở dữ liệu
//         userModel.findUserById(userId, (err, user) => {
//             if (err) {
//                 console.error("Error fetching user:", err);
//                 res.status(500).send("Internal Server Error");
//                 return;
//             }
//             // Sử dụng mật khẩu từ người dùng hiện tại để cập nhật
//             newData.password = user.password;

//             console.log(">>> check old pass: ", newData.password);

//             // Gọi hàm updateUser từ model để cập nhật thông tin người dùng
//             userModel.updateUser(userId, newData, (updateErr) => {
//                 if (updateErr) {
//                     console.error("Error updating user:", updateErr);
//                     res.status(500).json({ error: "Internal server error" });
//                     return;
//                 }
//                 res.redirect("/admin/userList");
//             });
//         });
//     } else {
//         // Nếu có mật khẩu mới, mã hóa nó bằng bcrypt
//         bcrypt.hash(req.body.password, 10, (hashErr, hashedPassword) => {
//             if (hashErr) {
//                 console.error("Error hashing password:", hashErr);
//                 res.status(500).json({ error: "Internal server error" });
//                 return;
//             }
//             // Cập nhật mật khẩu mới đã mã hóa vào newData
//             newData.password = hashedPassword;
//             console.log(">>> check new pass: ", newData.password);

//             // Gọi hàm updateUser từ model để cập nhật thông tin người dùng
//             userModel.updateUser(userId, newData, (updateErr) => {
//                 if (updateErr) {
//                     console.error("Error updating user:", updateErr);
//                     res.status(500).json({ error: "Internal server error" });
//                     return;
//                 }
//                 res.redirect("/admin/userList");
//             });
//         });
//     }
// };

const updateUser = async (req, res) => {
    const DB_HOST = process.env.DB_HOST || "localhost";
    const PORT = process.env.PORT || "8888";
    const userId = req.query.id;
    const { fullname, email, tel, address, role, password } = req.body;

    try {
        // Tạo object newData để chứa dữ liệu mới
        const newData = { fullname, email, tel, address, role };

        // Kiểm tra xem có cập nhật mật khẩu mới không
        if (!password) {
            // Nếu không có mật khẩu mới, lấy thông tin người dùng từ API
            const apiUrlGetUser = `http://${DB_HOST}:${PORT}/admin/api/user/${userId}`;
            const response = await fetch(apiUrlGetUser);
            if (!response.ok) {
                throw new Error("Fetch request failed");
            }
            const user = await response.json();
            // Giữ lại mật khẩu cũ
            newData.password = user.data.password;
        } else {
            // Nếu có mật khẩu mới, mã hóa nó bằng bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);
            newData.password = hashedPassword;
        }

        // Xây dựng URL cho request API
        const apiUrlUpdate = `http://${DB_HOST}:${PORT}/admin/api/updateUser/${userId}`;

        // Gửi request PATCH đến API để cập nhật thông tin người dùng
        const updateResponse = await fetch(apiUrlUpdate, {
            method: "PATCH", // Sử dụng phương thức PATCH cho việc cập nhật thông tin người dùng
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData) // Gửi dữ liệu mới
        });

        if (!updateResponse.ok) {
            throw new Error("Fetch request failed");
        }

        // Nếu request thành công, chuyển hướng người dùng đến trang danh sách người dùng
        res.redirect("/admin/userList");
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    renderUserListPage,
    renderUserEditPage,
    updateUser,

};