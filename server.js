const express = require("express");
const bodyParser = require('body-parser')
const path = require('path');
require("dotenv").config(); // Load environment variables from .env file

const app = express();

app.use(express.urlencoded());
app.use(bodyParser.urlencoded());


app.set('view engine', 'ejs');

//* Chỉ định thư mục gốc
app.use(express.static(path.join(__dirname, '/src')));
app.use('/', require('./src/client/routes/route.js'))


// Đặt thư mục views
app.set('views', path.join(__dirname, 'src', 'client', 'views'));

// app.get('/', (req, res) => {
//     res.render('index');
// });


const port = process.env.PORT || 3000; // Sử dụng cổng mặc định là 3000 nếu không có biến môi trường PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

