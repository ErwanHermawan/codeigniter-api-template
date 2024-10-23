-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 22, 2024 at 03:17 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_example`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_meta`
--

CREATE TABLE `tb_meta` (
  `meta_id` int(11) NOT NULL,
  `logo` varchar(7) DEFAULT NULL,
  `robots` varchar(20) DEFAULT NULL,
  `refresh` int(11) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `keywords` varchar(200) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `copyright` varchar(100) DEFAULT NULL,
  `theme_color` varchar(10) DEFAULT NULL,
  `domain_name` varchar(50) DEFAULT NULL,
  `twitter_account` varchar(200) DEFAULT NULL,
  `facebook_account` varchar(200) DEFAULT NULL,
  `instagram_account` varchar(200) DEFAULT NULL,
  `email_account` varchar(100) DEFAULT NULL,
  `og_image` varchar(8) DEFAULT NULL,
  `twitter_image` varchar(8) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_meta`
--

INSERT INTO `tb_meta` (`meta_id`, `logo`, `robots`, `refresh`, `title`, `description`, `keywords`, `author`, `copyright`, `theme_color`, `domain_name`, `twitter_account`, `facebook_account`, `instagram_account`, `email_account`, `og_image`, `twitter_image`, `created_by`, `created_date`, `updated_by`, `updated_date`) VALUES
(1, '1.png', 'no index, no follow', 1200, 'RZF Software', 'Offial Website RZF Software', 'rzf medis, aplikasi medis, aplikasi klinik', 'RZF Software', '2022 RZF Software All Right Reserved', '#6ab058', 'rzfsoftware.com', '@rzfsoftware', 'facebook.com', 'instagram.com', 'rzf-pos@gmail.com', '1.jpg', '1.jpg', 1, '2021-10-02 12:32:10', NULL, '2023-11-14 09:36:22');

-- --------------------------------------------------------

--
-- Table structure for table `tb_users`
--

CREATE TABLE `tb_users` (
  `user_id` int(4) NOT NULL,
  `photo` varchar(9) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` int(1) DEFAULT NULL,
  `status` enum('0','1') DEFAULT '0',
  `created_by` int(4) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` int(4) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_users`
--

INSERT INTO `tb_users` (`user_id`, `photo`, `name`, `username`, `email`, `phone`, `password`, `role`, `status`, `created_by`, `created_date`, `updated_by`, `updated_date`) VALUES
(3, NULL, 'Admin System', 'admin', 'admin@gmail.com', '082122313134', '$2y$10$8r1AGGi/Gx0t8a9IpR3ZQe0C5rBWUWbJSaIaLtSAyW6F1LBlrnXCC', 1, '1', NULL, '2024-10-12 13:52:38', 0, '2024-10-16 13:53:55'),
(4, NULL, 'Tes', 'tes', 'tes@gmail.com', '12312312312', '$2y$10$SSHY9J8r/bNeMBzgJ/nc6OZM4sHGSA8nIbG9S9TMMS0yqZ3uYWkYS', 1, '1', NULL, '2024-10-17 14:34:09', 0, '2024-10-17 14:34:09');

-- --------------------------------------------------------

--
-- Table structure for table `tb_users_log`
--

CREATE TABLE `tb_users_log` (
  `log_id` bigint(20) NOT NULL,
  `user_id` int(4) DEFAULT NULL,
  `date_log` timestamp NULL DEFAULT current_timestamp(),
  `status` tinyint(1) DEFAULT 0,
  `user_ip` char(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_users_log`
--

INSERT INTO `tb_users_log` (`log_id`, `user_id`, `date_log`, `status`, `user_ip`) VALUES
(1, 1, '2024-10-03 06:59:02', 1, '::1'),
(2, 1, '2024-10-03 07:36:00', 1, '::1'),
(3, 1, '2024-10-03 07:38:06', 1, '::1'),
(4, 1, '2024-10-03 07:39:36', 1, '::1'),
(5, 1, '2024-10-03 08:18:22', 1, '::1'),
(6, 1, '2024-10-04 02:44:29', 1, '::1'),
(7, 1, '2024-10-04 03:11:45', 1, '::1'),
(8, 1, '2024-10-04 03:12:39', 1, '::1'),
(9, 1, '2024-10-04 03:13:04', 1, '::1'),
(10, 1, '2024-10-04 03:15:59', 1, '::1'),
(11, 1, '2024-10-04 03:16:02', 1, '::1'),
(12, 1, '2024-10-04 03:18:21', 1, '::1'),
(13, 1, '2024-10-04 03:18:59', 1, '::1'),
(14, 1, '2024-10-04 03:29:46', 1, '::1'),
(15, 1, '2024-10-04 03:29:50', 1, '::1'),
(16, 1, '2024-10-04 03:44:20', 1, '::1'),
(17, 1, '2024-10-04 03:44:24', 1, '::1'),
(18, 1, '2024-10-04 03:44:54', 1, '::1'),
(19, 1, '2024-10-04 06:45:36', 1, '::1'),
(20, 1, '2024-10-04 07:05:56', 1, '::1'),
(21, 1, '2024-10-04 07:27:56', 1, '::1'),
(22, 1, '2024-10-04 07:35:54', 1, '::1'),
(23, 1, '2024-10-04 09:10:02', 1, '::1'),
(24, 1, '2024-10-05 00:42:18', 1, '::1'),
(25, 1, '2024-10-05 04:18:56', 1, '::1'),
(26, 1, '2024-10-05 06:06:18', 1, '::1'),
(27, 1, '2024-10-05 07:07:12', 1, '::1'),
(28, 1, '2024-10-05 08:18:26', 1, '::1'),
(29, 1, '2024-10-05 09:12:39', 1, '::1'),
(30, 1, '2024-10-07 00:59:47', 1, '::1'),
(31, 1, '2024-10-07 02:00:00', 1, '::1'),
(32, 1, '2024-10-07 03:47:35', 1, '::1'),
(33, 1, '2024-10-07 06:09:35', 1, '::1'),
(34, 1, '2024-10-07 07:11:51', 1, '::1'),
(35, 1, '2024-10-08 00:40:30', 1, '::1'),
(36, 1, '2024-10-08 01:51:20', 1, '::1'),
(37, 1, '2024-10-08 02:51:34', 1, '::1'),
(38, 1, '2024-10-08 03:55:20', 1, '::1'),
(39, 1, '2024-10-08 04:33:16', 1, '::1'),
(40, 1, '2024-10-08 06:07:47', 1, '::1'),
(41, 1, '2024-10-09 01:24:53', 1, '::1'),
(42, 1, '2024-10-09 04:30:49', 1, '::1'),
(43, 1, '2024-10-09 06:10:32', 1, '::1'),
(44, 1, '2024-10-09 06:23:51', 1, '::1'),
(45, 1, '2024-10-09 07:33:44', 1, '::1'),
(46, 1, '2024-10-09 08:31:33', 1, '::1'),
(47, 1, '2024-10-09 09:32:00', 1, '::1'),
(48, 1, '2024-10-10 00:47:13', 1, '::1'),
(49, 1, '2024-10-10 01:47:22', 1, '::1'),
(50, 1, '2024-10-10 06:23:11', 1, '::1'),
(51, 1, '2024-10-10 06:41:20', 1, '::1'),
(52, 1, '2024-10-10 07:47:16', 1, '::1'),
(53, 1, '2024-10-10 09:11:43', 1, '::1'),
(54, 1, '2024-10-10 09:11:50', 1, '::1'),
(55, 1, '2024-10-10 09:12:39', 1, '::1'),
(56, 1, '2024-10-10 09:13:07', 1, '::1'),
(57, 1, '2024-10-11 01:14:06', 1, '::1'),
(58, 1, '2024-10-11 01:48:21', 1, '::1'),
(59, 1, '2024-10-11 03:00:00', 1, '::1'),
(60, 1, '2024-10-11 06:42:38', 1, '::1'),
(61, 2, '2024-10-12 06:52:20', 1, '::1'),
(62, 3, '2024-10-17 09:02:05', 1, '::1'),
(63, 3, '2024-10-17 09:04:42', 1, '::1'),
(64, 3, '2024-10-21 13:26:03', 1, '::1'),
(65, 3, '2024-10-22 00:40:16', 1, '::1');

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_user_logs`
-- (See below for the actual view)
--
CREATE TABLE `vw_user_logs` (
`log_id` bigint(20)
,`user_id` int(4)
,`username` varchar(50)
,`date_log` timestamp
,`user_ip` char(20)
);

-- --------------------------------------------------------

--
-- Structure for view `vw_user_logs`
--
DROP TABLE IF EXISTS `vw_user_logs`;

CREATE VIEW `vw_user_logs`  AS SELECT `l`.`log_id` AS `log_id`, `l`.`user_id` AS `user_id`, `u`.`username` AS `username`, `l`.`date_log` AS `date_log`, `l`.`user_ip` AS `user_ip` FROM (`tb_users_log` `l` join `tb_users` `u` on(`u`.`user_id` = `l`.`user_id`))  ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_meta`
--
ALTER TABLE `tb_meta`
  ADD PRIMARY KEY (`meta_id`);

--
-- Indexes for table `tb_users`
--
ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `tb_users_log`
--
ALTER TABLE `tb_users_log`
  ADD PRIMARY KEY (`log_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_meta`
--
ALTER TABLE `tb_meta`
  MODIFY `meta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_users`
--
ALTER TABLE `tb_users`
  MODIFY `user_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tb_users_log`
--
ALTER TABLE `tb_users_log`
  MODIFY `log_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
