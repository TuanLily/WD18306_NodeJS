const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "wd18306_asm_nodejs"
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to database: " + err.stack);
        return;
    }
    console.log("Connected to database as id " + connection.threadId);
});

module.exports = connection;

// Sử dụng kết nối connection ở đây để thực hiện các truy vấn SQL
