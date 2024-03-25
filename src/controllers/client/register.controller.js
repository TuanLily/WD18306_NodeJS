const userModel = require("../../models/client/user");

const bcrypt = require("bcrypt");
const saltRounds = 10;


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


module.exports = {
    renderRegisterPage,
    addNewUser
};