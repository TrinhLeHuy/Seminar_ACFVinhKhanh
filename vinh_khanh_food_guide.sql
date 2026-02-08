-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 17, 2026 at 04:50 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vinh_khanh_food_guide`
--

-- --------------------------------------------------------

--
-- Table structure for table `audio_guide`
--

CREATE TABLE `audio_guide` (
  `audio_id` bigint(20) NOT NULL,
  `audio_url` varchar(255) NOT NULL,
  `language` varchar(50) NOT NULL,
  `location_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `audio_guide`
--

INSERT INTO `audio_guide` (`audio_id`, `audio_url`, `language`, `location_id`) VALUES
(1, 'https://audio.vinhkhanh.vn/oca_vi.mp3', 'vi', 1),
(2, 'https://audio.vinhkhanh.vn/oca_en.mp3', 'en', 1),
(3, 'https://audio.vinhkhanh.vn/hsb_vi.mp3', 'vi', 2);

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `food_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `description` text DEFAULT NULL,
  `location_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`food_id`, `name`, `price`, `description`, `location_id`) VALUES
(1, 'Ốc len xào dừa', 60000, 'Ốc len béo, nước dừa đậm vị', 1),
(2, 'Sò huyết nướng', 80000, 'Sò huyết nướng mỡ hành', 1),
(3, 'Tôm nướng muối ớt', 120000, 'Tôm sú nướng cay', 2);

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `location_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `name`, `description`, `latitude`, `longitude`, `image_url`, `user_id`) VALUES
(1, 'Quán Ốc A', 'Quán ốc lâu đời tại phố Vĩnh Khánh', 10.742774, 106.699181, 'https://img.com/oca.jpg', 1),
(2, 'Quán Hải Sản B', 'Hải sản tươi sống mỗi ngày', 10.7431, 106.6995, 'https://img.com/hsb.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `qr_code`
--

CREATE TABLE `qr_code` (
  `qr_id` bigint(20) NOT NULL,
  `qr_value` varchar(255) NOT NULL,
  `location_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `qr_code`
--

INSERT INTO `qr_code` (`qr_id`, `qr_value`, `location_id`) VALUES
(1, 'VK-OC-A-001', 1),
(2, 'VK-HS-B-002', 2);

-- --------------------------------------------------------

--
-- Table structure for table `qr_scan_log`
--

CREATE TABLE `qr_scan_log` (
  `log_id` bigint(20) NOT NULL,
  `scan_time` datetime DEFAULT current_timestamp(),
  `device_info` varchar(255) DEFAULT NULL,
  `qr_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `qr_scan_log`
--

INSERT INTO `qr_scan_log` (`log_id`, `scan_time`, `device_info`, `qr_id`) VALUES
(1, '2026-01-17 19:48:45', 'iPhone 15 Pro - iOS', 1),
(2, '2026-01-17 19:48:45', 'Android Samsung S23', 1),
(3, '2026-01-17 19:48:45', 'Chrome Windows', 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` bigint(20) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `role`) VALUES
(1, 'admin', '$2a$10$ZllQFG35ySL4n7OoGQKkX.BNxopi9JvUKH.FLCbNz7kVkxhK9QrMq', 'ADMIN'),
(2, 'guest', '$2a$10$aw2eKHxcn5eqyYXR7hObeOEEyZNWzzYLRzeL1SlAqxJK0Fh6qF6jm', 'USER');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audio_guide`
--
ALTER TABLE `audio_guide`
  ADD PRIMARY KEY (`audio_id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`food_id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `qr_code`
--
ALTER TABLE `qr_code`
  ADD PRIMARY KEY (`qr_id`),
  ADD UNIQUE KEY `qr_value` (`qr_value`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `qr_scan_log`
--
ALTER TABLE `qr_scan_log`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `qr_id` (`qr_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audio_guide`
--
ALTER TABLE `audio_guide`
  MODIFY `audio_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `food_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `qr_code`
--
ALTER TABLE `qr_code`
  MODIFY `qr_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `qr_scan_log`
--
ALTER TABLE `qr_scan_log`
  MODIFY `log_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `audio_guide`
--
ALTER TABLE `audio_guide`
  ADD CONSTRAINT `audio_guide_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`);

--
-- Constraints for table `food`
--
ALTER TABLE `food`
  ADD CONSTRAINT `food_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`);

--
-- Constraints for table `location`
--
ALTER TABLE `location`
  ADD CONSTRAINT `location_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `qr_code`
--
ALTER TABLE `qr_code`
  ADD CONSTRAINT `qr_code_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`);

--
-- Constraints for table `qr_scan_log`
--
ALTER TABLE `qr_scan_log`
  ADD CONSTRAINT `qr_scan_log_ibfk_1` FOREIGN KEY (`qr_id`) REFERENCES `qr_code` (`qr_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
