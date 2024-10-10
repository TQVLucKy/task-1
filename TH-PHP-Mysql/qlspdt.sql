-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 10, 2024 at 11:41 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `qlspdt`
--

-- --------------------------------------------------------

--
-- Table structure for table `danhmuc`
--

CREATE TABLE `danhmuc` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(3000) DEFAULT 'Ten ngay rat luoi nen khong ghi gi ca'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `danhmuc`
--

INSERT INTO `danhmuc` (`id`, `name`, `description`) VALUES
(1, 'danh muc 1', 'Ten ngay rat luoi nen khong ghi gi ca'),
(2, 'danh muc 2', 'Ten ngay rat luoi nen khong ghi gi ca');

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `id` int(11) NOT NULL,
  `sku` varchar(255) NOT NULL,
  `category_ids` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(3000) DEFAULT 'ten nay rat luoi nen khong ghi gi ca',
  `image` varchar(255) NOT NULL,
  `create_date` date NOT NULL,
  `update_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`id`, `sku`, `category_ids`, `name`, `description`, `image`, `create_date`, `update_date`) VALUES
(10, ' fox1', ' fox,animal,special,tes', ' fox', 'ten nay rat luoi nen khong ghi gi ca', 'istockphoto-1154370446-612x612.jpg', '2024-10-07', '2024-10-10'),
(13, 'dog v3', 'dog,animal,fox', 'dog fox', 'ten nay rat luoi nen khong ghi gi ca', 'cute-dog-portrait-isolated_23-2150194182.avif', '2024-10-08', NULL),
(14, 'cat1c', 'cat,polite', 'cat polite', 'ten nay rat luoi nen khong ghi gi ca', 'olli-the-polite-cat.jpg', '2024-10-08', NULL),
(15, 'justcat', 'cat', 'cat', 'ten nay rat luoi nen khong ghi gi ca', 'side-eye-cat.avif', '2024-10-08', NULL),
(16, 'flydragonblue', 'insect', 'flydragon', 'ten nay rat luoi nen khong ghi gi ca', 'clubtail-dragonfly-8006480_640.jpg', '2024-10-10', NULL),
(17, 'flydragon dramas', 'insect', 'flydragondra', 'ten nay rat luoi nen khong ghi gi ca', 'sympetrum_flaveolum_-_side_aka.jpg', '2024-10-10', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `danhmuc`
--
ALTER TABLE `danhmuc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `danhmuc`
--
ALTER TABLE `danhmuc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
