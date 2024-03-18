-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 18, 2024 at 09:33 AM
-- Server version: 8.0.31
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wd18306_asm_nodejs`
--

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `bill_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `bill_address` text COLLATE utf8mb4_general_ci NOT NULL,
  `bill_tel` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `bill_email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `bill_payment_methods` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1. Trả tiền mặt (COD)\r\n2. Chuyển khoản\r\n3. Thanh toán qua ngân hàng',
  `bill_date` date NOT NULL,
  `bill_status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1. Đơn hàng mới\r\n2. Đơn hàng đã xác nhận\r\n3. Đang vận chuyển\r\n4. Đơn hàng thành công'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `price` int NOT NULL,
  `qty` int NOT NULL,
  `total` int NOT NULL,
  `bill_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `status`) VALUES
(1, 'Trái cây', 1),
(2, 'Rau củ', 1),
(3, 'Trái cây tươi', 1),
(4, 'Rau củ tươi', 1),
(5, 'Trái cây chín mọng', 1),
(6, 'Rau củ sạch', 1),
(7, 'Trái cây nhập khẩu', 1),
(8, 'Rau củ hữu cơ', 1),
(9, 'Trái cây mùa hè', 1),
(12, 'Rau củ bổ dưỡng', 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `price` int NOT NULL,
  `sale_price` int NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `cate_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `sale_price`, `image`, `description`, `status`, `cate_id`) VALUES
(1, 'Táo Fuji', 25000, 22000, 'tao.png', 'Táo Fuji nhập khẩu từ Nhật Bản', 1, 1),
(2, 'Cà chua Đà Lạt', 15000, 12000, 'cachua.png', 'Cà chua Đà Lạt chín đỏ, giòn ngọt', 1, 2),
(3, 'Chuối Hà Nội', 30000, 28000, 'chuoi.png', 'Chuối ngọt, thơm, mềm', 1, 1),
(4, 'Cà rốt Mỹ', 20000, 18000, 'pngegg.png', 'Cà rốt Mỹ chắc chắn, màu sắc đẹp', 1, 2),
(5, 'Dưa hấu Hàn Quốc', 50000, 45000, 'duahau.png', 'Dưa hấu Hàn Quốc ngọt mát, giòn rụm', 1, 1),
(6, 'Bắp cải xanh', 18000, 15000, 'pngegg (3).png', 'Cải bắp Trung Quốc xanh tươi, không bị đắng', 1, 2),
(7, 'Xoài Cát Hòa Lộc', 35000, 30000, 'pngegg (1).png', 'Xoài Cát Hòa Lộc chín vàng, thơm ngọt', 1, 1),
(9, 'Bưởi Diễn', 40000, 35000, 'pngegg (2).png', 'Bưởi Diễn từ vườn ruộng miền Nam', 1, 1),
(10, 'Cà tím Ba Lan', 28000, 25000, 'dau.png', 'Cà tím Ba Lan đặc sản nước ngoài', 1, 2),
(12, 'Đào', 40000, 32000, 'dao.png', '<p>Đào ngon</p>', 1, 1),
(13, 'Táo Đà Lạt', 40000, 30000, 'tao.png', '<p>Táo vàng</p>', 1, 7);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `fullname` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `tel` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address` text COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1. Khách hàng\r\n2. Quản trị viên'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `tel`, `address`, `password`, `role`) VALUES
(1, 'Nguyễn Văn A', 'nguyenvana@example.com', '0123456789', 'Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội', '123456', 1),
(2, 'Trần Thị B', 'tranthib@example.com', '0987654321', 'Số 2 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội', 'abcdef', 1),
(3, 'Lê Văn C', 'levanc@example.com', '0365478912', 'Số 3 Nguyễn Du, Hoàn Kiếm, Hà Nội', 'password', 1),
(4, 'Phạm Thị D', 'phamthid@example.com', '0956847312', 'Số 4 Nguyễn Trãi, Thanh Xuân, Hà Nội', '123abc', 1),
(5, 'Hoàng Văn E', 'hoangvane@example.com', '0369874123', 'Số 5 Lê Văn Hưu, Hai Bà Trưng, Hà Nội', 'password123', 1),
(6, 'Vũ Thị F', 'vuthif@example.com', '0912345678', 'Số 6 Phạm Hùng, Cầu Giấy, Hà Nội', 'abc123', 1),
(7, 'Đinh Văn G', 'dinhvang@example.com', '0987456321', 'Số 7 Trần Duy Hưng, Cầu Giấy, Hà Nội', 'password456', 1),
(8, 'Ngô Thị H', 'ngothih@example.com', '0978563412', 'Số 8 Láng Hạ, Đống Đa, Hà Nội', '123456abc', 1),
(9, 'Mai Văn I', 'maivani@example.com', '0356412379', 'Số 9 Nguyễn Chí Thanh, Đống Đa, Hà Nội', 'abc123456', 1),
(10, 'Đặng Thị K', 'dangthik@example.com', '0946325871', 'Số 10 Hồ Tùng Mậu, Cầu Giấy, Hà Nội', '123abc456', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bill_id` (`bill_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cate_id` (`cate_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bill`
--
ALTER TABLE `bill`
  ADD CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `bill` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `cart_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`cate_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
