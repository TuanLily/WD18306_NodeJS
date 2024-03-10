
const express = require("express");
const path = require("path");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Sử dụng bodyParser để xử lý dữ liệu POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Đặt cấu hình cho trang client
const clientApp = express();
clientApp.set("views", path.join(__dirname, "src", "client", "views"));
clientApp.set("view engine", "ejs");
clientApp.use(express.static(path.join(__dirname, "src", "client")));
clientApp.use("/", require("./src/client/routes/route.js"));

// Đặt cấu hình cho trang admin
const adminApp = express();
adminApp.set("views", path.join(__dirname, "src", "admin", "adminViews"));
adminApp.set("view engine", "ejs");
adminApp.use(express.static(path.join(__dirname, "src", "admin")));
adminApp.use("/admin", require("./src/admin/adminRoutes/route.js"));

// Sử dụng các ứng dụng con trong ứng dụng chính
app.use(clientApp) && app.use(adminApp)
;


//! Chạy port
const port = process.env.PORT || 3000; // Sử dụng cổng mặc định là 3000 nếu không có biến môi trường PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

