const userModel = require("../model/user");



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

module.exports = {
    renderLoginPage,
    postLogin,
};