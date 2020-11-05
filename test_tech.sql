-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 05, 2020 at 03:24 PM
-- Server version: 8.0.22-0ubuntu0.20.04.2
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test_tech`
--

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `date` datetime NOT NULL,
  `id_sender` int NOT NULL,
  `id_recipient` int NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`date`, `id_sender`, `id_recipient`, `content`) VALUES
('2020-11-03 15:14:23', 1, 2, 'hello'),
('2020-11-05 13:40:21', 1, 2, 'hellooooo'),
('2020-11-05 13:40:32', 1, 2, 'hellooooo'),
('2020-11-05 13:40:33', 1, 2, 'hellooooo'),
('2020-11-05 13:40:34', 1, 2, 'hellooooo'),
('2020-11-05 13:45:39', 1, 2, 'hellooooo'),
('2020-11-05 13:56:30', 1, 2, 'hellooooo'),
('2020-11-05 14:00:45', 1, 2, 'je vais bien et toi ?'),
('2020-11-05 13:13:04', 2, 1, 'hello mathieu'),
('2020-11-05 14:00:13', 2, 1, 'comment vas tu ?');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int NOT NULL,
  `number` int NOT NULL,
  `id_resp` int NOT NULL,
  `dept` enum('Business','RH','SupportTech','Marketing','Compliance','Finance') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `number`, `id_resp`, `dept`) VALUES
(1, 1, 1, 'Business'),
(12, 3, 41, 'Business'),
(13, 4, 42, 'Business'),
(14, 5, 43, 'Business'),
(15, 6, 44, 'Business');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `last_name` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `first_name` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `e_mail` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `password` varchar(300) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_team` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `last_name`, `first_name`, `e_mail`, `password`, `id_team`) VALUES
(1, 'Dadoun', 'Mathieu', 'mathieu.dadoun@societe.com', 'Aaaaaaaaa1*', 1),
(2, 'simpson', 'bart', 'bart.simpson@societe.com', 'Aaaaaaaa1*', 1),
(39, 'Simpson', 'lisa', 'lisa.simpson.1@societe.com', 'Bbbbbbb1*', 1),
(40, 'Simpson', 'lisa', 'lisa.simpson.2@societe.com', 'Bbbbbbb1*', 1),
(41, 'Simpson', 'lisa', 'lisa.simpson.3@societe.com', 'Bbbbbbb1*', 12),
(42, 'Simpson', 'lisa', 'lisa.simpson.4@societe.com', 'Bbbbbbb1*', 13),
(43, 'Simpson', 'lisa', 'lisa.simpson.5@societe.com', 'Bbbbbbb1*', 14),
(44, 'Simpson', 'Homer', 'homer.simpson@societe.com', 'Bbbbbbb1*', 15),
(45, 'Simpson', 'Homer', 'homer.simpson.1@societe.com', 'Bbbbbbb1*', 1),
(46, 'Simpson', 'Homer', 'homer.simpson.2@societe.com', 'Bbbbbbb1*', 1),
(47, 'Simpson', 'Homer', 'homer.simpson.3@societe.com', 'Bbbbbbb1*', 1),
(48, 'Simpson', 'Homer', 'homer.simpson.4@societe.com', '$2b$10$N/Uap.iinIjA0yN6XbE54e/6bVblp/OCJBofr/grbsHDf9ttsmJ.G', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id_sender`,`id_recipient`,`date`),
  ADD KEY `c5` (`id_recipient`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `number` (`number`,`dept`),
  ADD KEY `c3` (`id_resp`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `eMail` (`e_mail`),
  ADD KEY `c1` (`id_team`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `c4` FOREIGN KEY (`id_sender`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `c5` FOREIGN KEY (`id_recipient`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teams`
--
ALTER TABLE `teams`
  ADD CONSTRAINT `c3` FOREIGN KEY (`id_resp`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `c1` FOREIGN KEY (`id_team`) REFERENCES `teams` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
