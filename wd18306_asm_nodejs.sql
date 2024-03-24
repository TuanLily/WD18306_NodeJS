-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 24, 2024 at 04:28 PM
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
(49, 'Trái cây nhiệt đới', 1);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `product_id`, `user_id`, `content`, `created_at`) VALUES
(16, 1, 67, 'good', '2024-03-22 02:50:08'),
(19, 3, 67, 'Chuối này ngon nè', '2024-03-22 02:59:56'),
(20, 2, 70, 'Xin chào', '2024-03-22 06:23:58'),
(21, 2, 67, 'Good', '2024-03-22 15:44:01'),
(22, 1, 67, 'Trái cây ngon, ngọt, hàng chất lượng tốt', '2024-03-23 04:47:25');

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
(10, 'Dâu Tây Hàn Quốc', 28000, 25000, 'dau.png', 'Cà tím Ba Lan đặc sản nước ngoài', 1, 7),
(12, 'Đào', 40000, 32000, 'dao.png', '<p>Đào ngon</p>', 1, 1),
(13, 'Táo Đà Lạt', 40000, 30000, 'tao.png', '<p>Táo vàng</p>', 1, 7),
(19, 'Cà Tím Đà Lạt', 30000, 26000, '1710901174505_pngegg (4).png', '<p>Cà tím Đà Lạt ngon</p>', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `fullname` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `tel` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1. Khách hàng\r\n2. Quản trị viên'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `tel`, `address`, `password`, `role`) VALUES
(66, 'Nguyễn Văn Chí Phèo', 'sutten2004@gmail.com', NULL, NULL, '$2b$10$7g5SehQovn9sWZAiNBbHieLuCoe.yOdyybWa3NoyAez5nsqk3lkqi', 1),
(67, 'Nguyễn Văn Chí Phèo', 'te@gmail.com', NULL, NULL, '$2b$10$iBEhb9tqJ.ytynL634/yx.V21DRjaCG3BCGlnQZk.wWFu6cy9rL8u', 1),
(68, '435345', 'st@gmail.com', NULL, NULL, '$2b$10$k40VXONNO3hLd1.DK6vEFu627wmAktjU9b9mByJR.dSaq94eeDzE.', 1),
(69, 'Long Ka', 'sutten2005@gmail.com', NULL, NULL, '$2b$10$36MBc5aCw/2Ow4dYfOb34OPOzzVKSUNYud1w8NodGBSjdT2H05o4m', 1),
(70, 'Nguyễn Văn Chí ', 'test@gmail.com', NULL, NULL, '$2b$10$m94w9cnJ9N4Sf2nYTPqK3.xmiitczO9Ty6ND8gs3ErHrj2mvMj26a', 1),
(71, 'rứdfdz', 'k55@gmail.com', '', '', '$2b$10$VLGiSflc1ID2JuOv3pkOG.nXOQ.e2UbhRMZlNxtXbueb/acJ/vb1e', 1),
(72, 'Tuấn LiLy', 'admin@admin.com', NULL, NULL, '$2b$10$fDIk4lxf7M7.B9RQ1JdBG.Inds9w0hWQjcJBDDTmIUTuJRIR.NFcK', 2);

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
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

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
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`cate_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
