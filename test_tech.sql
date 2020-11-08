-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 08, 2020 at 03:58 PM
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
('2020-11-08 15:55:50', 53, 54, 'bonjour lisa'),
('2020-11-08 15:56:01', 53, 54, 'tu vas bien ?'),
('2020-11-08 15:56:39', 53, 54, 'Tres bien merci'),
('2020-11-08 15:55:39', 54, 53, 'bonjour bart'),
('2020-11-08 15:56:22', 54, 53, 'Oui je vais bien et toi ?');

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
(17, 1, 51, 'Business'),
(18, 2, 52, 'Business'),
(19, 1, 53, 'RH'),
(20, 1, 54, 'Marketing'),
(21, 1, 57, 'Finance');

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
(51, 'Simpson', 'Marge', 'marge.simpson@societe.com', '$2b$10$jC/slbHOMAtHG2vlARraXOhNI6AH0HEybN2S6vYLxQpZ7qj1wycsq', 17),
(52, 'Simpson', 'Homer', 'homer.simpson@societe.com', '$2b$10$OHDcJ8ams2v3yurIGibKauA4teYdI7L1x/XqvcVat2U0b5kkUWQE2', 18),
(53, 'Simpson', 'Bart', 'bart.simpson@societe.com', '$2b$10$UKjQHE9a.Nz2vbROCMPGBuDDA3QCEm2NzPu4I2ocup0oQzbuk6kAm', 19),
(54, 'Simpson', 'Lisa', 'lisa.simpson@societe.com', '$2b$10$5utIfiaByTzpW6nbGaQoj.uXfv2gJsGLhMeHPVtQvSk048MhMI8Qu', 20),
(55, 'Simpson', 'Maggie', 'maggie.simpson@societe.com', '$2b$10$dwSPYlRHuQAK5V/skg9N9uCTiZLnE7nXvWgcbRINWRLgrIq/.tjf.', 20),
(56, 'Bob', 'Tahiti', 'tahiti.bob@societe.com', '$2b$10$uQo668cpzcg.gD0HAIVOIuTtPWX4rccMxfk3bFTFGhtSKkfg3DDdS', 18),
(57, 'Simpson', 'Homer', 'homer.simpson.1@societe.com', '$2b$10$CG6dvzzgKPiLfmqCqINmO.F.siAaeSFpaF5tkkDTjYaZHpNMYjOFO', 21);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

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
