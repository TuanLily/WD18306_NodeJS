const express = require("express");
const session = require("express-session");

const path = require("path");
require("dotenv").config(); // Load environment variables from .env file
const bodyParser = require("body-parser");

const app = express();

// Sử dụng bodyParser để xử lý dữ liệu POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "src")));

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

// Thiết lập thư mục views cho client và admin
app.use((req, res, next) => {
    if (req.originalUrl.startsWith("/admin")) {
        // Nếu URL bắt đầu bằng /admin, sử dụng thư mục views/admin
        app.set("views", path.join(__dirname, "src", "views", "admin"));
    } else {
        // Ngược lại, sử dụng thư mục views/client
        app.set("views", path.join(__dirname, "src", "views", "client"));
    }
    next();
});

// Thiết lập view engine
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "src")));

// Cấu hình route cho trang Admin
app.use("/admin", require("./src/routes/admin/route.js"));
app.use("/admin", require("./src/routes/admin/cateRoute.js"));
app.use("/admin", require("./src/routes/admin/productRoute.js"));
app.use("/admin", require("./src/routes/admin/userRoute.js"));
app.use("/admin", require("./src/routes/admin/commentRoute.js"));


// Cấu hình route cho trang Client
app.use("/", require("./src/routes/client/route.js"));
app.use("/", require("./src/routes/client/loginRoute.js"));
app.use("/", require("./src/routes/client/registerRoute.js"));
app.use("/", require("./src/routes/client/commentRoute.js"));



app.use("/admin/api", require("./src/routes/api/api.js"));


// Đặt cấu hình cho trang client
// const clientApp = express();
// clientApp.set("views", path.join(__dirname, "src", "client", "views"));
// clientApp.set("view engine", "ejs");
// clientApp.use(express.static(path.join(__dirname, "src", "client")));
// clientApp.use("/", require("./src/client/routes/route.js"));
// clientApp.use("/", require("./src/client/routes/loginRoute.js"));
// clientApp.use("/", require("./src/client/routes/registerRoute.js"));
// clientApp.use("/", require("./src/client/routes/commentRoute.js"));

// Đặt cấu hình cho trang admin
// const adminApp = express();
// adminApp.set("views", path.join(__dirname, "src", "admin", "adminViews"));
// adminApp.set("view engine", "ejs");
// adminApp.use(express.static(path.join(__dirname, "src", "admin")));
// adminApp.use("/admin", require("./src/admin/adminRoutes/route.js"));
// adminApp.use("/admin", require("./src/admin/adminRoutes/cateRoute.js"));
// adminApp.use("/admin", require("./src/admin/adminRoutes/productRoute.js"));
// adminApp.use("/admin", require("./src/admin/adminRoutes/userRoute.js"));
// adminApp.use("/admin", require("./src/admin/adminRoutes/commentRoute.js"));

// Sử dụng các ứng dụng con trong ứng dụng chính
// app.use(clientApp);
// app.use(adminApp);

//! Chạy port
const port = process.env.PORT || 3000; // Sử dụng cổng mặc định là 3000 nếu không có biến môi trường PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
