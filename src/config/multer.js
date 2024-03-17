const path = require("path");

const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Sử dụng phương thức `path.resolve()` để tính đường dẫn tuyệt đối từ thư mục gốc của ứng dụng
        const uploadDir = path.resolve(__dirname, "../uploads");
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Xử lý tên file tùy ý ở đây
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
