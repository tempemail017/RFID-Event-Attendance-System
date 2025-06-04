-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2025 at 03:44 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db-eventattendance`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `ad_Username` varchar(200) NOT NULL,
  `ad_Password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `ad_Username`, `ad_Password`) VALUES
(1, 'admin', 'admin123');

-- --------------------------------------------------------

--
-- Table structure for table `attendancelogs`
--

CREATE TABLE `attendancelogs` (
  `id` int(11) NOT NULL,
  `meet_Id` varchar(200) NOT NULL,
  `meet_Title` varchar(200) NOT NULL,
  `meet_Date` varchar(200) NOT NULL,
  `stu_CardNumber` varchar(200) NOT NULL,
  `stu_Fname` varchar(200) NOT NULL,
  `stu_Sex` varchar(200) NOT NULL,
  `stu_Program` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendancelogs`
--

INSERT INTO `attendancelogs` (`id`, `meet_Id`, `meet_Title`, `meet_Date`, `stu_CardNumber`, `stu_Fname`, `stu_Sex`, `stu_Program`) VALUES
(1, '1', 'test', '2025-06-03', 'FFF5E16BD00', 'Samantha E. Cordero', 'F', 'BS Psychology'),
(2, '1', 'test', '2025-06-03', 'FFF5E16BD00', 'Samantha E. Cordero', 'F', 'BS Psychology'),
(3, '1', 'test', '2025-06-03', '6375DFE1', 'Abby Kent B. Esmael', 'M', 'BS INFO'),
(4, '2', 'CCS Foundation Day', '2025-06-03', '6375DFE1', 'Abby Kent B. Esmael', 'M', 'BS INFO'),
(5, '2', 'CCS Foundation Day', '2025-06-03', 'FFF5E16BD00', 'Samantha E. Cordero', 'F', 'BS Psychology'),
(6, '3', 'CCS Semester Orientation', '2025-06-09', '6375DFE1', 'Abby Kent B. Esmael', 'M', 'BS Info. Tech.'),
(8, '3', 'CCS Semester Orientation', '2025-06-09', 'FFF5E16BD00', 'Samantha E. Cordero', 'F', 'BS Psychology'),
(9, '3', 'CCS Semester Orientation', '2025-06-09', 'FFF5E16BD00', 'Samantha E. Cordero', 'F', 'BS Psychology'),
(10, '6', 'CCS Enrollment Assitance ', '2025-06-03', '6375DFE1', 'Abby Kent B. Esmael', 'M', 'BS Info. Tech.'),
(11, '6', 'CCS Enrollment Assitance ', '2025-06-03', 'FFF5E16BD00', 'Samantha E. Cordero', 'F', 'BS Psychology'),
(14, '2', 'CCS Foundation Day', '2025-06-03', '6375DFE1', 'Abby Kent B. Esmael', 'M', 'BS Info. Tech.'),
(18, '3', 'CCS Semester Orientation', '2025-06-09', 'FFF5E16BD00', '', '', ''),
(21, '2', 'CCS Foundation Day', '2025-06-03', '6375DFE1', 'Abby Kent B. Esmael', 'M', 'BS Info. Tech.'),
(22, '34', 'CCS Brigada', '2025-06-05', 'FFF5E16BD00', 'Samantha E. Cordero', 'F', 'BS Psychology'),
(24, '36', 'CCS Acquaintance Day', '2025-06-07', '6375DFE1', 'Abby Kent B. Esmael', 'M', 'BS Info. Tech.'),
(30, '40', 'CCS Track Guidance Program', '2025-06-29', '6375DFE1', 'Abby Kent B. Esmael', 'M', 'BS Info. Tech.'),
(31, '40', 'CCS Track Guidance Program', '2025-06-29', 'FFF5E16BD00', 'Samantha E. Cordero', 'F', 'BS Psychology'),
(34, '38', 'CCS Acquaintance Day', '2025-06-07', '6375DFE1', 'Abby Kent B. Esmael', 'M', 'BS Info. Tech.'),
(35, '39', 'CCS Foundation Day', '2025-06-21', '6375DFE1', 'Abby Kent B. Esmael', 'M', 'BS Info. Tech.'),
(36, '44', 'CCS Track Guidance Program', '2025-06-07', '6375DFE1', 'Abby Kent B. Esmael', 'M', 'BS Info. Tech.'),
(37, '38', 'CCS Acquaintance Day', '2025-06-07', '6375DFE1', 'Abby Kent B. Esmael', 'M', 'BS Info. Tech.'),
(38, '39', 'CCS Foundation Day', '2025-06-21', 'FFF5E16BD00', 'Samantha E. Cordero', 'F', 'BS Psychology');

-- --------------------------------------------------------

--
-- Table structure for table `meetings`
--

CREATE TABLE `meetings` (
  `id` int(11) NOT NULL,
  `meet_Title` varchar(200) NOT NULL,
  `meet_Date` varchar(200) NOT NULL,
  `meet_Status` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meetings`
--

INSERT INTO `meetings` (`id`, `meet_Title`, `meet_Date`, `meet_Status`) VALUES
(38, 'CCS Acquaintance Day', '2025-06-07', 'Public'),
(39, 'CCS Foundation Day', '2025-06-21', 'Public'),
(44, 'CCS Track Guidance Program', '2025-06-07', 'Private');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `stu_CardNumber` varchar(200) NOT NULL,
  `stu_Fname` varchar(200) NOT NULL,
  `stu_Sex` varchar(200) NOT NULL,
  `stu_Program` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `stu_CardNumber`, `stu_Fname`, `stu_Sex`, `stu_Program`) VALUES
(1, '6375DFE1', 'Abby Kent B. Esmael', 'M', 'BS Info. Tech.'),
(2, 'FFF5E16BD00', 'Samantha E. Cordero', 'F', 'BS Psychology');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attendancelogs`
--
ALTER TABLE `attendancelogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `attendancelogs`
--
ALTER TABLE `attendancelogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `meetings`
--
ALTER TABLE `meetings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
