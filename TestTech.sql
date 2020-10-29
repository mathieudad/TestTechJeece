-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 29, 2020 at 11:01 PM
-- Server version: 8.0.21-0ubuntu0.20.04.4
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
-- Database: `TestTech`
--

-- --------------------------------------------------------

--
-- Table structure for table `Teams`
--

CREATE TABLE `Teams` (
  `id` int NOT NULL,
  `number` int NOT NULL,
  `idResp` int NOT NULL,
  `dept` enum('Business','RH','SupportTech','Marketing','Compliance','Finance') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Teams`
--

INSERT INTO `Teams` (`id`, `number`, `idResp`, `dept`) VALUES
(1, 1, 1, 'Business'),
(4, 2, 20, 'Business');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `eMail` varchar(50) NOT NULL,
  `password` varchar(40) NOT NULL,
  `idTeam` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `lastName`, `firstName`, `eMail`, `password`, `idTeam`) VALUES
(1, 'Dadoun', 'Mathieu', 'mathieu.dadoun@societe.com', 'm', 1),
(2, 'simpson', 'bart', 'bart.simpson@societe.com', 'Aaaaaaaa1*', 1),
(16, 'Simpson', 'Lisa', 'lisa.simpson@societe.com', 'Bbbbbbb1*', NULL),
(17, 'Simpson', 'Lisa', 'lisa.simpson.1@societe.com', 'Bbbbbbb1*', NULL),
(19, 'Simpson', 'Lisa', 'lisa.simpson.3@societe.com', 'Bbbbbbb1*', NULL),
(20, 'Simpson', 'Lisa', 'lisa.simpson.4@societe.com', 'Bbbbbbb1*', NULL),
(21, 'Simpson', '', '.simpson@societe.com', 'Bbbbbbb1*', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Teams`
--
ALTER TABLE `Teams`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `number` (`number`,`dept`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `eMail` (`eMail`),
  ADD KEY `c1` (`idTeam`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Teams`
--
ALTER TABLE `Teams`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `c1` FOREIGN KEY (`idTeam`) REFERENCES `Teams` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
