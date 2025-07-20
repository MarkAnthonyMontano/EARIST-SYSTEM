-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 20, 2025 at 07:27 PM
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
-- Database: `enrollment`
--

-- --------------------------------------------------------

--
-- Table structure for table `active_school_year_table`
--

CREATE TABLE `active_school_year_table` (
  `id` int(11) NOT NULL,
  `year_id` int(11) DEFAULT NULL,
  `semester_id` int(11) DEFAULT NULL,
  `astatus` int(11) DEFAULT NULL,
  `active` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `active_school_year_table`
--

INSERT INTO `active_school_year_table` (`id`, `year_id`, `semester_id`, `astatus`, `active`) VALUES
(1, 4, 1, 1, 0),
(2, 9, 2, 0, 0),
(3, 9, 1, 0, 0),
(4, 10, 2, 0, 1),
(6, 4, 2, 0, 0),
(8, 12, 2, 0, 0),
(9, 3, 2, 0, 0),
(10, 13, 2, 0, 0),
(11, 13, 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `course_table`
--

CREATE TABLE `course_table` (
  `course_id` int(11) NOT NULL,
  `course_code` varchar(100) DEFAULT NULL,
  `course_description` varchar(255) DEFAULT NULL,
  `course_unit` int(11) DEFAULT NULL,
  `lab_unit` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_table`
--

INSERT INTO `course_table` (`course_id`, `course_code`, `course_description`, `course_unit`, `lab_unit`) VALUES
(1, 'GEREADPH', 'Readings in Philippine History', 3, 0),
(2, 'GEUNDETS', 'Understanding the Self', 3, 0),
(3, 'GEARTAPP', 'Art Appreciation', 3, 0),
(4, 'GEPURPCO', 'Purposive Communication', 3, 0),
(5, 'GEKOMFIL', 'Kontekstwalisadong Komunikasyon sa Filipino', 3, 0),
(6, 'INTCOMLC', 'Introduction to Computing (Lecture)', 2, 0),
(7, 'INTCOMLB', 'Introduction to Computing (Laboratory)', 0, 1),
(8, 'FPROGLEC', 'Computer Programming 1 (Lecture)', 2, 0),
(9, 'FPROGLAB', 'Computer Programming 1 (Laboratory)', 0, 1),
(10, 'GEPEMOVE', 'Movement Enhancement', 2, 0),
(11, 'NSTPCTS1', 'National Service Training Program 1', 3, 0),
(12, 'GEMATHMW', 'Mathematics in the Modern World', 3, 0),
(13, 'GESCIETS', 'Science, Technology and Society', 3, 0),
(14, 'GEFILDIS', 'Filipino sa Iba’t-Ibang Disiplina', 3, 0),
(15, 'GEPANIPI', 'Panitikan sa Pilipinas', 3, 0),
(16, 'IPROGLEC', 'Computer Programming 2 (Lecture)', 2, 0),
(17, 'IPROGLAB', 'Computer Programming 2 (Laboratory)', 0, 1),
(18, 'DISCMATH', 'Discrete Mathematics', 3, 0),
(19, 'DBMSLEC1', 'Database Management System 1 (Lecture)', 2, 0),
(20, 'DBMSLAB1', 'Database Management System 1 (Laboratory)', 0, 1),
(21, 'GEPEFITE', 'Fitness Exercise', 2, 0),
(22, 'NSTPCTS2', 'National Service Training Program 2', 3, 0),
(23, 'GEETHICS', 'Ethics', 3, 0),
(24, 'DSALGLEC', 'Data Structures and Algorithm 1 (Lecture)', 2, 0),
(25, 'DSALGLAB', 'Data Structures and Algorithm 1 (Laboratory)', 0, 1),
(26, 'INFMGTLC', 'Information Management (Lecture)', 2, 0),
(27, 'INFMGTLB', 'Information Management (Laboratory)', 0, 1),
(28, 'PTECHLEC', 'Platform Technologies (Lecture)', 2, 0),
(29, 'PTECHLAB', 'Platform Technologies (Laboratory)', 0, 1),
(30, 'WEBDVLC1', 'Web Development 1 (Lecture)', 2, 0),
(31, 'WEBDVLB1', 'Web Development 1 (Laboratory)', 0, 1),
(32, 'BUSANALY', 'Business Analytics', 3, 0),
(33, 'GEPEHEF1', 'Physical Activity Towards Health and Fitness 1', 2, 0),
(34, 'GEELECCP', 'Communicative Proficiency in Business Writing', 3, 0),
(35, 'DBMSLEC2', 'Database Management System 2 (Lecture)', 2, 0),
(36, 'DBMSLAB2', 'Database Management System 2 (Laboratory)', 0, 1),
(37, 'INTHCILC', 'Introduction to Human-Computer Interaction (Lecture)', 2, 0),
(38, 'INTHCILB', 'Introduction to Human-Computer Interaction (Laboratory)', 0, 1),
(39, 'NETWKLC1', 'Networking 1 (Lecture)', 2, 0),
(40, 'NETWKLB1', 'Networking 1 (Laboratory)', 0, 1),
(41, 'WEBDVLC2', 'Web Development 2 (Lecture)', 2, 0),
(42, 'WEBDVLB2', 'Web Development 2 (Laboratory)', 0, 1),
(43, 'IPATLEC1', 'Integrative Programming and Technologies 1 (Lecture)', 2, 0),
(44, 'IPATLAB1', 'Integrative Programming and Technologies 1 (Laboratory)', 0, 1),
(45, 'GEPEHEF2', 'Physical Activity Towards Health and Fitness 2', 2, 0),
(46, 'GEELECDS', 'Practical Data Science', 3, 0),
(47, 'WEBDVLC3', 'Web Development 3 (Lecture)', 2, 0),
(48, 'WEBDVLB3', 'Web Development 3 (Laboratory)', 0, 1),
(49, 'MMDIALEC', 'Multimedia (Lecture)', 2, 0),
(50, 'MMDIALAB', 'Multimedia (Laboratory)', 0, 1),
(51, 'SYSARCH1', 'Systems Integration and Architecture 1 (Lecture)', 2, 0),
(52, 'SYSARLB1', 'Systems Integration and Architecture 1 (Laboratory)', 0, 1),
(53, 'APDEVLEC', 'Application Development and Emerging Tech (Lecture)', 2, 0),
(54, 'APDEVLAB', 'Application Development and Emerging Tech (Lab)', 0, 1),
(55, 'NETWKLC2', 'Networking 2 (Lecture)', 2, 0),
(56, 'NETWKLB2', 'Networking 2 (Laboratory)', 0, 1),
(57, 'GELIFEWR', 'Life and Works of Rizal', 3, 0),
(58, 'GEELECES', 'Environmental Science', 3, 0),
(59, 'QUANMETH', 'Quantitative Methods', 3, 0),
(60, 'ITTHESI1', 'Research 1', 3, 0),
(61, 'MOBAPLEC', 'Mobile App Development (Lecture)', 2, 0),
(62, 'MOBAPLAB', 'Mobile App Development (Laboratory)', 0, 1),
(63, 'OOPRGLEC', 'Object-Oriented Programming (Lecture)', 2, 0),
(64, 'OOPRGLAB', 'Object-Oriented Programming (Laboratory)', 0, 1),
(65, 'IAASLEC1', 'Information Assurance and Security 1 (Lecture)', 2, 0),
(66, 'IAASLAB1', 'Information Assurance and Security 1 (Laboratory)', 0, 1),
(67, 'GECONTWO', 'Contemporary World', 3, 0),
(68, 'SYSARCH2', 'Systems Integration and Architecture 2 (Lecture)', 2, 0),
(69, 'SYSARLB2', 'Systems Integration and Architecture 2 (Laboratory)', 0, 1),
(70, 'ITTHESI2', 'Research 2 (Lecture)', 2, 0),
(71, 'ITTHESL2', 'Research 2 (Laboratory)', 0, 1),
(72, 'IAASLEC2', 'Information Assurance and Security 2 (Lecture)', 2, 0),
(73, 'IAASLAB2', 'Information Assurance and Security 2 (Laboratory)', 0, 1),
(74, 'SYSADMLC', 'Systems Administration and Maintenance (Lecture)', 2, 0),
(75, 'SYSADMLB', 'Systems Administration and Maintenance (Laboratory)', 0, 1),
(76, 'SPISSUES', 'Social and Professional Issues', 3, 0),
(77, 'ITINTERN', 'Practicum / Internship', 10, 0),
(78, 'GELIFEWR', 'Life And Work of Rizal', 2, 0),
(79, 'GELIFEWR', 'Life And Work of Rizal', 2, 0),
(80, 'DATANALY', 'Data Analytics ', 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `curriculum_table`
--

CREATE TABLE `curriculum_table` (
  `curriculum_id` int(11) NOT NULL,
  `year_id` int(11) DEFAULT NULL,
  `program_id` int(11) DEFAULT NULL,
  `lock_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `curriculum_table`
--

INSERT INTO `curriculum_table` (`curriculum_id`, `year_id`, `program_id`, `lock_status`) VALUES
(1, 1, 1, 0),
(2, 2, 2, 0),
(3, 3, 3, 0),
(4, 4, 4, 0),
(5, 5, 5, 0),
(6, 6, 6, 0),
(7, 7, 7, 0),
(8, 8, 8, 0),
(9, 9, 9, 0),
(10, 10, 10, 0),
(11, 11, 11, 0),
(12, 12, 12, 0),
(13, 13, 13, 0),
(14, 14, 14, 0),
(15, 15, 15, 0),
(16, 16, 16, 0),
(17, 17, 17, 0),
(18, 18, 18, 0),
(19, 19, 19, 0),
(20, 20, 20, 0),
(21, 21, 21, 0),
(22, 22, 22, 0),
(23, 23, 23, 0),
(24, 24, 24, 0),
(25, 25, 25, 0),
(26, 26, 26, 0),
(27, 27, 27, 0),
(28, 28, 28, 0),
(29, 29, 29, 0),
(30, 30, 30, 0),
(31, 31, 31, 0),
(32, 32, 32, 0),
(33, 33, 33, 0),
(34, 34, 34, 0),
(35, 35, 35, 0),
(36, 36, 36, 0),
(37, 37, 37, 0),
(38, 38, 38, 0),
(39, 39, 39, 0),
(40, 40, 40, 0),
(41, 41, 41, 0),
(42, 42, 42, 0),
(43, 43, 43, 0),
(44, 44, 44, 0),
(45, 45, 45, 0),
(46, 46, 46, 0),
(47, 47, 47, 0),
(48, 48, 48, 0),
(49, 49, 49, 0),
(50, 50, 50, 0),
(51, 51, 51, 0),
(52, 52, 52, 0),
(53, 53, 53, 0),
(54, 54, 54, 0),
(55, 55, 55, 0),
(56, 56, 56, 0),
(57, 57, 57, 0);

-- --------------------------------------------------------

--
-- Table structure for table `dprtmnt_curriculum_table`
--

CREATE TABLE `dprtmnt_curriculum_table` (
  `dprtmnt_curriculum_id` int(11) NOT NULL,
  `dprtmnt_id` int(11) DEFAULT NULL,
  `curriculum_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dprtmnt_curriculum_table`
--

INSERT INTO `dprtmnt_curriculum_table` (`dprtmnt_curriculum_id`, `dprtmnt_id`, `curriculum_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 41),
(6, 1, 42),
(7, 2, 5),
(8, 2, 6),
(9, 2, 7),
(10, 3, 8),
(11, 3, 9),
(12, 3, 10),
(13, 3, 11),
(14, 4, 22),
(15, 4, 12),
(16, 5, 13),
(17, 5, 14),
(18, 6, 15),
(19, 6, 16),
(20, 6, 17),
(21, 6, 18),
(22, 6, 19),
(23, 6, 20),
(24, 6, 21),
(25, 7, 23),
(26, 7, 24),
(27, 7, 25),
(28, 7, 26),
(29, 7, 27),
(30, 7, 28),
(31, 8, 29),
(32, 8, 30),
(33, 9, 31),
(34, 9, 32),
(35, 9, 33),
(36, 9, 34),
(37, 9, 35),
(38, 9, 36),
(39, 9, 37),
(40, 9, 38),
(41, 9, 39),
(42, 10, 43),
(43, 10, 44),
(44, 10, 45),
(45, 10, 46),
(46, 11, 47),
(47, 11, 48),
(48, 11, 49),
(49, 11, 50),
(50, 11, 51),
(51, 11, 52),
(52, 11, 53),
(53, 11, 54),
(54, 11, 55),
(55, 11, 56),
(56, 11, 57);

-- --------------------------------------------------------

--
-- Table structure for table `dprtmnt_profs_table`
--

CREATE TABLE `dprtmnt_profs_table` (
  `dprtmnt_profs_id` int(11) NOT NULL,
  `dprtmnt_id` int(11) DEFAULT NULL,
  `prof_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dprtmnt_profs_table`
--

INSERT INTO `dprtmnt_profs_table` (`dprtmnt_profs_id`, `dprtmnt_id`, `prof_id`) VALUES
(1, 5, 1),
(2, 5, 2),
(3, 5, 3),
(4, 5, 4),
(5, 5, 5),
(6, 5, 6),
(7, 2, 7),
(8, 5, 8),
(9, 5, 9),
(10, 5, 10),
(11, 5, 11),
(12, 5, 12),
(13, 5, 13),
(14, 5, 14),
(15, 5, 15),
(16, 2, 16),
(17, 2, 17),
(18, 2, 18),
(19, 5, 19),
(20, 2, 20),
(21, 2, 21),
(22, 2, 22),
(23, 2, 23),
(24, 2, 24),
(25, 2, 25),
(26, 2, 17),
(27, 2, 18),
(28, 2, 20),
(29, 2, 21),
(30, 2, 22),
(31, 2, 23),
(32, 2, 24),
(33, 2, 25),
(34, 2, 26),
(35, 2, 27),
(36, 2, 29),
(37, 2, 30),
(38, 11, 59),
(39, 5, 60),
(40, 5, 28),
(41, 5, 37),
(42, 5, 34),
(43, 5, 31),
(44, 5, 36),
(45, 5, 32),
(46, 5, 33),
(47, 5, 35);

-- --------------------------------------------------------

--
-- Table structure for table `dprtmnt_room_table`
--

CREATE TABLE `dprtmnt_room_table` (
  `dprtmnt_room_id` int(11) NOT NULL,
  `dprtmnt_id` int(11) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `lock_status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dprtmnt_room_table`
--

INSERT INTO `dprtmnt_room_table` (`dprtmnt_room_id`, `dprtmnt_id`, `room_id`, `lock_status`) VALUES
(3, 5, 3, 0),
(4, 5, 4, 0),
(5, 5, 5, 0),
(13, 2, 13, 0),
(14, 2, 14, 0),
(15, 2, 15, 0),
(16, 2, 16, 0),
(17, 2, 17, 0),
(18, 2, 18, 0),
(19, 2, 19, 0),
(20, 2, 20, 0);

-- --------------------------------------------------------

--
-- Table structure for table `dprtmnt_section_table`
--

CREATE TABLE `dprtmnt_section_table` (
  `id` int(11) NOT NULL,
  `curriculum_id` int(11) DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL,
  `dsstat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dprtmnt_section_table`
--

INSERT INTO `dprtmnt_section_table` (`id`, `curriculum_id`, `section_id`, `dsstat`) VALUES
(1, 1, 1, 0),
(2, 1, 2, 0),
(3, 1, 3, 0),
(4, 1, 4, 0),
(5, 1, 5, 0),
(6, 1, 6, 0),
(7, 1, 7, 0),
(8, 1, 8, 0),
(9, 1, 9, 0),
(10, 1, 10, 0),
(11, 1, 11, 0),
(12, 1, 12, 0),
(13, 2, 1, 0),
(14, 2, 2, 0),
(15, 2, 3, 0),
(16, 2, 4, 0),
(17, 2, 5, 0),
(18, 2, 6, 0),
(19, 2, 7, 0),
(20, 2, 8, 0),
(21, 2, 9, 0),
(22, 2, 10, 0),
(23, 2, 11, 0),
(24, 2, 12, 0),
(25, 3, 1, 0),
(26, 3, 2, 0),
(27, 3, 3, 0),
(28, 3, 4, 0),
(29, 3, 5, 0),
(30, 3, 6, 0),
(31, 3, 7, 0),
(32, 3, 8, 0),
(33, 3, 9, 0),
(34, 3, 10, 0),
(35, 3, 11, 0),
(36, 3, 12, 0),
(37, 4, 1, 0),
(38, 4, 2, 0),
(39, 4, 3, 0),
(40, 4, 4, 0),
(41, 4, 5, 0),
(42, 4, 6, 0),
(43, 4, 7, 0),
(44, 4, 8, 0),
(45, 4, 9, 0),
(46, 4, 10, 0),
(47, 4, 11, 0),
(48, 4, 12, 0),
(49, 5, 1, 0),
(50, 5, 2, 0),
(51, 5, 3, 0),
(52, 5, 4, 0),
(53, 5, 5, 0),
(54, 5, 6, 0),
(55, 5, 7, 0),
(56, 5, 8, 0),
(57, 5, 9, 0),
(58, 5, 10, 0),
(59, 5, 11, 0),
(60, 5, 12, 0),
(61, 6, 1, 0),
(62, 6, 2, 0),
(63, 6, 3, 0),
(64, 6, 4, 0),
(65, 6, 5, 0),
(66, 6, 6, 0),
(67, 6, 7, 0),
(68, 6, 8, 0),
(69, 6, 9, 0),
(70, 6, 10, 0),
(71, 6, 11, 0),
(72, 6, 12, 0),
(73, 7, 1, 0),
(74, 7, 2, 0),
(75, 7, 3, 0),
(76, 7, 4, 0),
(77, 7, 5, 0),
(78, 7, 6, 0),
(79, 7, 7, 0),
(80, 7, 8, 0),
(81, 7, 9, 0),
(82, 7, 10, 0),
(83, 7, 11, 0),
(84, 7, 12, 0),
(85, 8, 1, 0),
(86, 8, 2, 0),
(87, 8, 3, 0),
(88, 8, 4, 0),
(89, 8, 5, 0),
(90, 8, 6, 0),
(91, 8, 7, 0),
(92, 8, 8, 0),
(93, 8, 9, 0),
(94, 8, 10, 0),
(95, 8, 11, 0),
(96, 8, 12, 0),
(97, 9, 1, 0),
(98, 9, 2, 0),
(99, 9, 3, 0),
(100, 9, 4, 0),
(101, 9, 5, 0),
(102, 9, 6, 0),
(103, 9, 7, 0),
(104, 9, 8, 0),
(105, 9, 9, 0),
(106, 9, 10, 0),
(107, 9, 11, 0),
(108, 9, 12, 0),
(109, 10, 1, 0),
(110, 10, 2, 0),
(111, 10, 3, 0),
(112, 10, 4, 0),
(113, 10, 5, 0),
(114, 10, 6, 0),
(115, 10, 7, 0),
(116, 10, 8, 0),
(117, 10, 9, 0),
(118, 10, 10, 0),
(119, 10, 11, 0),
(120, 10, 12, 0),
(121, 11, 1, 0),
(122, 11, 2, 0),
(123, 11, 3, 0),
(124, 11, 4, 0),
(125, 11, 5, 0),
(126, 11, 6, 0),
(127, 11, 7, 0),
(128, 11, 8, 0),
(129, 11, 9, 0),
(130, 11, 10, 0),
(131, 11, 11, 0),
(132, 11, 12, 0),
(133, 12, 1, 0),
(134, 12, 2, 0),
(135, 12, 3, 0),
(136, 12, 4, 0),
(137, 12, 5, 0),
(138, 12, 6, 0),
(139, 12, 7, 0),
(140, 12, 8, 0),
(141, 12, 9, 0),
(142, 12, 10, 0),
(143, 12, 11, 0),
(144, 12, 12, 0),
(145, 13, 1, 0),
(146, 13, 2, 0),
(147, 13, 3, 0),
(148, 13, 4, 0),
(149, 13, 5, 0),
(150, 13, 6, 0),
(151, 13, 7, 0),
(152, 13, 8, 0),
(153, 13, 9, 0),
(154, 13, 10, 0),
(155, 13, 11, 0),
(156, 13, 12, 0),
(157, 14, 1, 0),
(158, 14, 2, 0),
(159, 14, 3, 0),
(160, 14, 4, 0),
(161, 14, 5, 0),
(162, 14, 6, 0),
(163, 14, 7, 0),
(164, 14, 8, 0),
(165, 14, 9, 0),
(166, 14, 10, 0),
(167, 14, 11, 0),
(168, 14, 12, 0),
(169, 15, 1, 0),
(170, 15, 2, 0),
(171, 15, 3, 0),
(172, 15, 4, 0),
(173, 15, 5, 0),
(174, 15, 6, 0),
(175, 15, 7, 0),
(176, 15, 8, 0),
(177, 15, 9, 0),
(178, 15, 10, 0),
(179, 15, 11, 0),
(180, 15, 12, 0),
(181, 16, 1, 0),
(182, 16, 2, 0),
(183, 16, 3, 0),
(184, 16, 4, 0),
(185, 16, 5, 0),
(186, 16, 6, 0),
(187, 16, 7, 0),
(188, 16, 8, 0),
(189, 16, 9, 0),
(190, 16, 10, 0),
(191, 16, 11, 0),
(192, 16, 12, 0),
(193, 17, 1, 0),
(194, 17, 2, 0),
(195, 17, 3, 0),
(196, 17, 4, 0),
(197, 17, 5, 0),
(198, 17, 6, 0),
(199, 17, 7, 0),
(200, 17, 8, 0),
(201, 17, 9, 0),
(202, 17, 10, 0),
(203, 17, 11, 0),
(204, 17, 12, 0),
(205, 18, 1, 0),
(206, 18, 2, 0),
(207, 18, 3, 0),
(208, 18, 4, 0),
(209, 18, 5, 0),
(210, 18, 6, 0),
(211, 18, 7, 0),
(212, 18, 8, 0),
(213, 18, 9, 0),
(214, 18, 10, 0),
(215, 18, 11, 0),
(216, 18, 12, 0),
(217, 19, 1, 0),
(218, 19, 2, 0),
(219, 19, 3, 0),
(220, 19, 4, 0),
(221, 19, 5, 0),
(222, 19, 6, 0),
(223, 19, 7, 0),
(224, 19, 8, 0),
(225, 19, 9, 0),
(226, 19, 10, 0),
(227, 19, 11, 0),
(228, 19, 12, 0),
(229, 20, 1, 0),
(230, 20, 2, 0),
(231, 20, 3, 0),
(232, 20, 4, 0),
(233, 20, 5, 0),
(234, 20, 6, 0),
(235, 20, 7, 0),
(236, 20, 8, 0),
(237, 20, 9, 0),
(238, 20, 10, 0),
(239, 20, 11, 0),
(240, 20, 12, 0),
(241, 21, 1, 0),
(242, 21, 2, 0),
(243, 21, 3, 0),
(244, 21, 4, 0),
(245, 21, 5, 0),
(246, 21, 6, 0),
(247, 21, 7, 0),
(248, 21, 8, 0),
(249, 21, 9, 0),
(250, 21, 10, 0),
(251, 21, 11, 0),
(252, 21, 12, 0),
(253, 22, 1, 0),
(254, 22, 2, 0),
(255, 22, 3, 0),
(256, 22, 4, 0),
(257, 22, 5, 0),
(258, 22, 6, 0),
(259, 22, 7, 0),
(260, 22, 8, 0),
(261, 22, 9, 0),
(262, 22, 10, 0),
(263, 22, 11, 0),
(264, 22, 12, 0),
(265, 23, 1, 0),
(266, 23, 2, 0),
(267, 23, 3, 0),
(268, 23, 4, 0),
(269, 23, 5, 0),
(270, 23, 6, 0),
(271, 23, 7, 0),
(272, 23, 8, 0),
(273, 23, 9, 0),
(274, 23, 10, 0),
(275, 23, 11, 0),
(276, 23, 12, 0),
(277, 24, 1, 0),
(278, 24, 2, 0),
(279, 24, 3, 0),
(280, 24, 4, 0),
(281, 24, 5, 0),
(282, 24, 6, 0),
(283, 24, 7, 0),
(284, 24, 8, 0),
(285, 24, 9, 0),
(286, 24, 10, 0),
(287, 24, 11, 0),
(288, 24, 12, 0),
(289, 25, 1, 0),
(290, 25, 2, 0),
(291, 25, 3, 0),
(292, 25, 4, 0),
(293, 25, 5, 0),
(294, 25, 6, 0),
(295, 25, 7, 0),
(296, 25, 8, 0),
(297, 25, 9, 0),
(298, 25, 10, 0),
(299, 25, 11, 0),
(300, 25, 12, 0),
(301, 26, 1, 0),
(302, 26, 2, 0),
(303, 26, 3, 0),
(304, 26, 4, 0),
(305, 26, 5, 0),
(306, 26, 6, 0),
(307, 26, 7, 0),
(308, 26, 8, 0),
(309, 26, 9, 0),
(310, 26, 10, 0),
(311, 26, 11, 0),
(312, 26, 12, 0),
(313, 27, 1, 0),
(314, 27, 2, 0),
(315, 27, 3, 0),
(316, 27, 4, 0),
(317, 27, 5, 0),
(318, 27, 6, 0),
(319, 27, 7, 0),
(320, 27, 8, 0),
(321, 27, 9, 0),
(322, 27, 10, 0),
(323, 27, 11, 0),
(324, 27, 12, 0),
(325, 28, 1, 0),
(326, 28, 2, 0),
(327, 28, 3, 0),
(328, 28, 4, 0),
(329, 28, 5, 0),
(330, 28, 6, 0),
(331, 28, 7, 0),
(332, 28, 8, 0),
(333, 28, 9, 0),
(334, 28, 10, 0),
(335, 28, 11, 0),
(336, 28, 12, 0),
(337, 29, 1, 0),
(338, 29, 2, 0),
(339, 29, 3, 0),
(340, 29, 4, 0),
(341, 29, 5, 0),
(342, 29, 6, 0),
(343, 29, 7, 0),
(344, 29, 8, 0),
(345, 29, 9, 0),
(346, 29, 10, 0),
(347, 29, 11, 0),
(348, 29, 12, 0),
(349, 30, 1, 0),
(350, 30, 2, 0),
(351, 30, 3, 0),
(352, 30, 4, 0),
(353, 30, 5, 0),
(354, 30, 6, 0),
(355, 30, 7, 0),
(356, 30, 8, 0),
(357, 30, 9, 0),
(358, 30, 10, 0),
(359, 30, 11, 0),
(360, 30, 12, 0),
(361, 31, 1, 0),
(362, 31, 2, 0),
(363, 31, 3, 0),
(364, 31, 4, 0),
(365, 31, 5, 0),
(366, 31, 6, 0),
(367, 31, 7, 0),
(368, 31, 8, 0),
(369, 31, 9, 0),
(370, 31, 10, 0),
(371, 31, 11, 0),
(372, 31, 12, 0),
(373, 32, 1, 0),
(374, 32, 2, 0),
(375, 32, 3, 0),
(376, 32, 4, 0),
(377, 32, 5, 0),
(378, 32, 6, 0),
(379, 32, 7, 0),
(380, 32, 8, 0),
(381, 32, 9, 0),
(382, 32, 10, 0),
(383, 32, 11, 0),
(384, 32, 12, 0),
(385, 33, 1, 0),
(386, 33, 2, 0),
(387, 33, 3, 0),
(388, 33, 4, 0),
(389, 33, 5, 0),
(390, 33, 6, 0),
(391, 33, 7, 0),
(392, 33, 8, 0),
(393, 33, 9, 0),
(394, 33, 10, 0),
(395, 33, 11, 0),
(396, 33, 12, 0),
(397, 34, 1, 0),
(398, 34, 2, 0),
(399, 34, 3, 0),
(400, 34, 4, 0),
(401, 34, 5, 0),
(402, 34, 6, 0),
(403, 34, 7, 0),
(404, 34, 8, 0),
(405, 34, 9, 0),
(406, 34, 10, 0),
(407, 34, 11, 0),
(408, 34, 12, 0),
(409, 35, 1, 0),
(410, 35, 2, 0),
(411, 35, 3, 0),
(412, 35, 4, 0),
(413, 35, 5, 0),
(414, 35, 6, 0),
(415, 35, 7, 0),
(416, 35, 8, 0),
(417, 35, 9, 0),
(418, 35, 10, 0),
(419, 35, 11, 0),
(420, 35, 12, 0),
(421, 36, 1, 0),
(422, 36, 2, 0),
(423, 36, 3, 0),
(424, 36, 4, 0),
(425, 36, 5, 0),
(426, 36, 6, 0),
(427, 36, 7, 0),
(428, 36, 8, 0),
(429, 36, 9, 0),
(430, 36, 10, 0),
(431, 36, 11, 0),
(432, 36, 12, 0),
(433, 37, 1, 0),
(434, 37, 2, 0),
(435, 37, 3, 0),
(436, 37, 4, 0),
(437, 37, 5, 0),
(438, 37, 6, 0),
(439, 37, 7, 0),
(440, 37, 8, 0),
(441, 37, 9, 0),
(442, 37, 10, 0),
(443, 37, 11, 0),
(444, 37, 12, 0),
(445, 38, 1, 0),
(446, 38, 2, 0),
(447, 38, 3, 0),
(448, 38, 4, 0),
(449, 38, 5, 0),
(450, 38, 6, 0),
(451, 38, 7, 0),
(452, 38, 8, 0),
(453, 38, 9, 0),
(454, 38, 10, 0),
(455, 38, 11, 0),
(456, 38, 12, 0),
(457, 39, 1, 0),
(458, 39, 2, 0),
(459, 39, 3, 0),
(460, 39, 4, 0),
(461, 39, 5, 0),
(462, 39, 6, 0),
(463, 39, 7, 0),
(464, 39, 8, 0),
(465, 39, 9, 0),
(466, 39, 10, 0),
(467, 39, 11, 0),
(468, 39, 12, 0),
(469, 40, 1, 0),
(470, 40, 2, 0),
(471, 40, 3, 0),
(472, 40, 4, 0),
(473, 40, 5, 0),
(474, 40, 6, 0),
(475, 40, 7, 0),
(476, 40, 8, 0),
(477, 40, 9, 0),
(478, 40, 10, 0),
(479, 40, 11, 0),
(480, 40, 12, 0),
(481, 41, 1, 0),
(482, 41, 2, 0),
(483, 41, 3, 0),
(484, 41, 4, 0),
(485, 41, 5, 0),
(486, 41, 6, 0),
(487, 41, 7, 0),
(488, 41, 8, 0),
(489, 41, 9, 0),
(490, 41, 10, 0),
(491, 41, 11, 0),
(492, 41, 12, 0),
(493, 42, 1, 0),
(494, 42, 2, 0),
(495, 42, 3, 0),
(496, 42, 4, 0),
(497, 42, 5, 0),
(498, 42, 6, 0),
(499, 42, 7, 0),
(500, 42, 8, 0),
(501, 42, 9, 0),
(502, 42, 10, 0),
(503, 42, 11, 0),
(504, 42, 12, 0);

-- --------------------------------------------------------

--
-- Table structure for table `dprtmnt_table`
--

CREATE TABLE `dprtmnt_table` (
  `dprtmnt_id` int(11) NOT NULL,
  `dprtmnt_name` varchar(255) DEFAULT NULL,
  `dprtmnt_code` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dprtmnt_table`
--

INSERT INTO `dprtmnt_table` (`dprtmnt_id`, `dprtmnt_name`, `dprtmnt_code`) VALUES
(1, 'College of Architecture and Fine Arts', 'CAFA'),
(2, 'College of Arts and Sciences', 'CAS'),
(3, 'College of Business and Public Administration', 'CBPA'),
(4, 'College of Criminal Justice Education', 'CCJE'),
(5, 'College of Computing Studies', 'CCS'),
(6, 'College of Education', 'CED'),
(7, 'College of Engineering', 'CEN'),
(8, 'College of Hospitality and Tourism Management', 'CHTM'),
(9, 'College of Industrial Technology', 'CIT'),
(10, 'Graduate School Doctoral Program', 'GSDP'),
(11, 'Graduate School Master Program', 'GSMP');

-- --------------------------------------------------------

--
-- Table structure for table `enrolled_subject`
--

CREATE TABLE `enrolled_subject` (
  `id` int(11) NOT NULL,
  `student_number` int(11) NOT NULL,
  `curriculum_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `active_school_year_id` int(11) DEFAULT NULL,
  `midterm` int(11) NOT NULL,
  `finals` int(11) NOT NULL,
  `final_grade` int(11) NOT NULL,
  `en_remarks` int(11) NOT NULL,
  `department_section_id` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrolled_subject`
--

INSERT INTO `enrolled_subject` (`id`, `student_number`, `curriculum_id`, `course_id`, `active_school_year_id`, `midterm`, `finals`, `final_grade`, `en_remarks`, `department_section_id`, `status`) VALUES
(26, 224095240, 10, 20, 3, 0, 0, 0, 0, 1, 1),
(55, 224091140, 1, 12, 4, 0, 0, 0, 0, 3, 0),
(56, 224091140, 1, 13, 4, 0, 0, 0, 0, 3, 0),
(57, 224091140, 1, 14, 4, 0, 0, 0, 0, 3, 0),
(58, 224091140, 1, 15, 4, 0, 0, 0, 0, 3, 0),
(59, 224091140, 1, 16, 4, 0, 0, 0, 0, 3, 0),
(60, 224091140, 1, 17, 4, 0, 0, 0, 0, 3, 0),
(61, 224091140, 1, 18, 4, 0, 0, 0, 0, 3, 0),
(62, 224091140, 1, 19, 4, 0, 0, 0, 0, 3, 0),
(63, 224091140, 1, 20, 4, 0, 0, 0, 0, 3, 0),
(64, 224091140, 1, 21, 4, 0, 0, 0, 0, 3, 0),
(65, 224091140, 1, 22, 4, 0, 0, 0, 0, 3, 0),
(66, 224091140, 1, 1, 3, 0, 0, 0, 0, 8, 0),
(67, 224091140, 1, 5, 3, 0, 0, 0, 0, 8, 0),
(68, 224091140, 1, 6, 3, 0, 0, 0, 0, 8, 0),
(69, 224091140, 1, 10, 3, 0, 0, 0, 0, 8, 0),
(70, 224091140, 1, 7, 3, 0, 0, 0, 0, 8, 0),
(71, 224091140, 1, 8, 3, 0, 0, 0, 0, 8, 0),
(72, 224091140, 1, 9, 3, 0, 0, 0, 0, 8, 0),
(73, 224091140, 1, 11, 3, 0, 0, 0, 0, 8, 0),
(74, 224091140, 1, 2, 3, 0, 0, 0, 0, 8, 0),
(76, 224091140, 1, 4, 3, 0, 0, 0, 0, 8, 0),
(78, 224091140, 1, 3, 3, 0, 0, 0, 0, 8, 0),
(79, 224091140, 1, 1, 1, 0, 0, 0, 0, 2, 0),
(80, 224091140, 1, 8, 1, 0, 0, 0, 0, 2, 0),
(81, 224091140, 1, 9, 1, 0, 0, 0, 0, 2, 0),
(82, 224091140, 1, 11, 1, 0, 0, 0, 0, 2, 0),
(83, 224091140, 1, 10, 1, 0, 0, 0, 0, 2, 0),
(84, 224091140, 1, 2, 1, 0, 0, 0, 0, 2, 0),
(85, 224091140, 1, 3, 1, 0, 0, 0, 0, 2, 0),
(86, 224091140, 1, 4, 1, 0, 0, 0, 0, 2, 0),
(87, 224091140, 1, 5, 1, 0, 0, 0, 0, 2, 0),
(88, 224091140, 1, 7, 1, 0, 0, 0, 0, 2, 0),
(89, 224091140, 1, 6, 1, 0, 0, 0, 0, 2, 0),
(90, 202400011, 1, 1, 1, 0, 0, 0, 0, 1, 0),
(91, 202400011, 1, 5, 1, 0, 0, 0, 0, 1, 0),
(92, 202400011, 1, 7, 1, 0, 0, 0, 0, 1, 0),
(93, 202400011, 1, 8, 1, 0, 0, 0, 0, 1, 0),
(94, 202400011, 1, 6, 1, 0, 0, 0, 0, 1, 0),
(95, 202400011, 1, 3, 1, 0, 0, 0, 0, 1, 0),
(96, 202400011, 1, 2, 1, 0, 0, 0, 0, 1, 0),
(97, 202400011, 1, 9, 1, 0, 0, 0, 0, 1, 0),
(98, 202400011, 1, 4, 1, 0, 0, 0, 0, 1, 0),
(99, 202400011, 1, 10, 1, 0, 0, 0, 0, 1, 0),
(100, 202400011, 1, 11, 1, 0, 0, 0, 0, 1, 0),
(112, 202400013, 1, 1, 1, 0, 0, 0, 0, 1, 0),
(113, 202400013, 1, 5, 1, 0, 0, 0, 0, 1, 0),
(114, 202400013, 1, 6, 1, 0, 0, 0, 0, 1, 0),
(115, 202400013, 1, 7, 1, 0, 0, 0, 0, 1, 0),
(116, 202400013, 1, 8, 1, 0, 0, 0, 0, 1, 0),
(117, 202400013, 1, 9, 1, 0, 0, 0, 0, 1, 0),
(118, 202400013, 1, 2, 1, 0, 0, 0, 0, 1, 0),
(119, 202400013, 1, 11, 1, 0, 0, 0, 0, 1, 0),
(120, 202400013, 1, 10, 1, 0, 0, 0, 0, 1, 0),
(121, 202400013, 1, 3, 1, 0, 0, 0, 0, 1, 0),
(122, 202400013, 1, 4, 1, 0, 0, 0, 0, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `period_status`
--

CREATE TABLE `period_status` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `period_status`
--

INSERT INTO `period_status` (`id`, `description`, `status`) VALUES
(1, 'Midterm', 0),
(2, 'Finals', 1);

-- --------------------------------------------------------

--
-- Table structure for table `person_prof_table`
--

CREATE TABLE `person_prof_table` (
  `person_id` int(11) NOT NULL,
  `bachelor` varchar(255) DEFAULT NULL,
  `master` varchar(255) DEFAULT NULL,
  `doctor` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `person_prof_table`
--

INSERT INTO `person_prof_table` (`person_id`, `bachelor`, `master`, `doctor`) VALUES
(40, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `person_status_table`
--

CREATE TABLE `person_status_table` (
  `id` int(11) NOT NULL,
  `person_id` int(11) DEFAULT NULL,
  `exam_status` int(11) DEFAULT NULL,
  `requirements` int(11) DEFAULT NULL,
  `residency` int(11) DEFAULT NULL,
  `student_registration_status` int(11) DEFAULT NULL,
  `exam_result` int(11) DEFAULT NULL,
  `hs_ave` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `person_status_table`
--

INSERT INTO `person_status_table` (`id`, `person_id`, `exam_status`, `requirements`, `residency`, `student_registration_status`, `exam_result`, `hs_ave`) VALUES
(20, 1, 0, 0, 0, 1, 0, 0),
(21, 3, 0, 0, 0, 1, 0, 0),
(22, 2, 0, 0, 0, 1, 0, 0),
(23, 4, 0, 0, 0, 0, 0, 0),
(24, 5, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `person_table`
--

CREATE TABLE `person_table` (
  `person_id` int(11) NOT NULL,
  `profile_img` varchar(255) DEFAULT NULL,
  `campus` int(11) DEFAULT NULL,
  `academicProgram` varchar(100) DEFAULT NULL,
  `classifiedAs` varchar(50) DEFAULT NULL,
  `program` varchar(100) DEFAULT NULL,
  `program2` varchar(100) DEFAULT NULL,
  `program3` varchar(100) DEFAULT NULL,
  `yearLevel` varchar(30) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `extension` varchar(10) DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `height` varchar(10) DEFAULT NULL,
  `weight` varchar(10) DEFAULT NULL,
  `lrnNumber` varchar(20) DEFAULT NULL,
  `nolrnNumber` int(5) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `pwdMember` int(5) DEFAULT NULL,
  `pwdType` varchar(50) DEFAULT NULL,
  `pwdId` varchar(50) DEFAULT NULL,
  `birthOfDate` varchar(50) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `birthPlace` varchar(255) DEFAULT NULL,
  `languageDialectSpoken` varchar(255) DEFAULT NULL,
  `citizenship` varchar(50) DEFAULT NULL,
  `religion` varchar(50) DEFAULT NULL,
  `civilStatus` varchar(50) DEFAULT NULL,
  `tribeEthnicGroup` varchar(50) DEFAULT NULL,
  `cellphoneNumber` varchar(20) DEFAULT NULL,
  `emailAddress` varchar(100) DEFAULT NULL,
  `presentStreet` varchar(255) DEFAULT NULL,
  `presentBarangay` varchar(100) DEFAULT NULL,
  `presentZipCode` varchar(10) DEFAULT NULL,
  `presentRegion` varchar(100) DEFAULT NULL,
  `presentProvince` varchar(100) DEFAULT NULL,
  `presentMunicipality` varchar(100) DEFAULT NULL,
  `presentDswdHouseholdNumber` varchar(50) DEFAULT NULL,
  `sameAsPresentAddress` int(5) DEFAULT NULL,
  `permanentStreet` varchar(255) DEFAULT NULL,
  `permanentBarangay` varchar(100) DEFAULT NULL,
  `permanentZipCode` varchar(10) DEFAULT NULL,
  `permanentRegion` varchar(75) DEFAULT NULL,
  `permanentProvince` varchar(75) DEFAULT NULL,
  `permanentMunicipality` varchar(75) DEFAULT NULL,
  `permanentDswdHouseholdNumber` varchar(50) DEFAULT NULL,
  `solo_parent` int(5) DEFAULT NULL,
  `father_deceased` int(5) DEFAULT NULL,
  `father_family_name` varchar(100) DEFAULT NULL,
  `father_given_name` varchar(100) DEFAULT NULL,
  `father_middle_name` varchar(100) DEFAULT NULL,
  `father_ext` varchar(10) DEFAULT NULL,
  `father_nickname` varchar(50) DEFAULT NULL,
  `father_education` int(5) NOT NULL,
  `father_education_level` varchar(100) DEFAULT NULL,
  `father_last_school` varchar(100) DEFAULT NULL,
  `father_course` varchar(100) DEFAULT NULL,
  `father_year_graduated` varchar(10) DEFAULT NULL,
  `father_school_address` varchar(255) DEFAULT NULL,
  `father_contact` varchar(20) DEFAULT NULL,
  `father_occupation` varchar(100) DEFAULT NULL,
  `father_employer` varchar(100) DEFAULT NULL,
  `father_income` varchar(20) DEFAULT NULL,
  `father_email` varchar(100) DEFAULT NULL,
  `mother_deceased` int(5) DEFAULT NULL,
  `mother_family_name` varchar(100) DEFAULT NULL,
  `mother_given_name` varchar(100) DEFAULT NULL,
  `mother_middle_name` varchar(100) DEFAULT NULL,
  `mother_ext` varchar(10) DEFAULT NULL,
  `mother_nickname` varchar(50) DEFAULT NULL,
  `mother_education` int(5) NOT NULL,
  `mother_education_level` varchar(100) DEFAULT NULL,
  `mother_last_school` varchar(100) DEFAULT NULL,
  `mother_course` varchar(100) DEFAULT NULL,
  `mother_year_graduated` varchar(10) DEFAULT NULL,
  `mother_school_address` varchar(255) DEFAULT NULL,
  `mother_contact` varchar(20) DEFAULT NULL,
  `mother_occupation` varchar(100) DEFAULT NULL,
  `mother_employer` varchar(100) DEFAULT NULL,
  `mother_income` varchar(20) DEFAULT NULL,
  `mother_email` varchar(100) DEFAULT NULL,
  `guardian` varchar(100) DEFAULT NULL,
  `guardian_family_name` varchar(100) DEFAULT NULL,
  `guardian_given_name` varchar(100) DEFAULT NULL,
  `guardian_middle_name` varchar(100) DEFAULT NULL,
  `guardian_ext` varchar(20) DEFAULT NULL,
  `guardian_nickname` varchar(50) DEFAULT NULL,
  `guardian_address` varchar(255) DEFAULT NULL,
  `guardian_contact` varchar(20) DEFAULT NULL,
  `guardian_email` varchar(100) DEFAULT NULL,
  `annual_income` varchar(50) DEFAULT NULL,
  `schoolLevel` varchar(50) DEFAULT NULL,
  `schoolLastAttended` varchar(100) DEFAULT NULL,
  `schoolAddress` varchar(255) DEFAULT NULL,
  `courseProgram` varchar(100) DEFAULT NULL,
  `honor` varchar(100) DEFAULT NULL,
  `generalAverage` decimal(5,2) DEFAULT NULL,
  `yearGraduated` int(11) DEFAULT NULL,
  `schoolLevel1` varchar(50) DEFAULT NULL,
  `schoolLastAttended1` varchar(100) DEFAULT NULL,
  `schoolAddress1` varchar(255) DEFAULT NULL,
  `courseProgram1` varchar(100) DEFAULT NULL,
  `honor1` varchar(100) DEFAULT NULL,
  `generalAverage1` decimal(5,2) DEFAULT NULL,
  `yearGraduated1` int(11) DEFAULT NULL,
  `strand` varchar(100) DEFAULT NULL,
  `cough` int(11) DEFAULT NULL,
  `colds` int(11) DEFAULT NULL,
  `fever` int(11) DEFAULT NULL,
  `asthma` int(11) DEFAULT NULL,
  `faintingSpells` int(11) DEFAULT NULL,
  `heartDisease` int(11) DEFAULT NULL,
  `tuberculosis` int(11) DEFAULT NULL,
  `frequentHeadaches` int(11) DEFAULT NULL,
  `hernia` int(11) DEFAULT NULL,
  `chronicCough` int(11) DEFAULT NULL,
  `headNeckInjury` int(11) DEFAULT NULL,
  `hiv` int(11) DEFAULT NULL,
  `highBloodPressure` int(11) DEFAULT NULL,
  `diabetesMellitus` int(11) DEFAULT NULL,
  `allergies` int(11) DEFAULT NULL,
  `cancer` int(11) DEFAULT NULL,
  `smokingCigarette` int(11) DEFAULT NULL,
  `alcoholDrinking` int(11) DEFAULT NULL,
  `hospitalized` int(11) DEFAULT NULL,
  `hospitalizationDetails` varchar(255) DEFAULT NULL,
  `medications` varchar(255) DEFAULT NULL,
  `hadCovid` int(11) DEFAULT NULL,
  `covidDate` varchar(50) DEFAULT NULL,
  `vaccine1Brand` varchar(50) DEFAULT NULL,
  `vaccine1Date` varchar(50) DEFAULT NULL,
  `vaccine2Brand` varchar(50) DEFAULT NULL,
  `vaccine2Date` varchar(50) DEFAULT NULL,
  `booster1Brand` varchar(50) DEFAULT NULL,
  `booster1Date` varchar(50) DEFAULT NULL,
  `booster2Brand` varchar(50) DEFAULT NULL,
  `booster2Date` varchar(50) DEFAULT NULL,
  `chestXray` varchar(100) DEFAULT NULL,
  `cbc` varchar(100) DEFAULT NULL,
  `urinalysis` varchar(100) DEFAULT NULL,
  `otherworkups` varchar(255) DEFAULT NULL,
  `symptomsToday` int(11) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `termsOfAgreement` int(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPRESSED;

--
-- Dumping data for table `person_table`
--

INSERT INTO `person_table` (`person_id`, `profile_img`, `campus`, `academicProgram`, `classifiedAs`, `program`, `program2`, `program3`, `yearLevel`, `last_name`, `first_name`, `middle_name`, `extension`, `nickname`, `height`, `weight`, `lrnNumber`, `nolrnNumber`, `gender`, `pwdMember`, `pwdType`, `pwdId`, `birthOfDate`, `age`, `birthPlace`, `languageDialectSpoken`, `citizenship`, `religion`, `civilStatus`, `tribeEthnicGroup`, `cellphoneNumber`, `emailAddress`, `presentStreet`, `presentBarangay`, `presentZipCode`, `presentRegion`, `presentProvince`, `presentMunicipality`, `presentDswdHouseholdNumber`, `sameAsPresentAddress`, `permanentStreet`, `permanentBarangay`, `permanentZipCode`, `permanentRegion`, `permanentProvince`, `permanentMunicipality`, `permanentDswdHouseholdNumber`, `solo_parent`, `father_deceased`, `father_family_name`, `father_given_name`, `father_middle_name`, `father_ext`, `father_nickname`, `father_education`, `father_education_level`, `father_last_school`, `father_course`, `father_year_graduated`, `father_school_address`, `father_contact`, `father_occupation`, `father_employer`, `father_income`, `father_email`, `mother_deceased`, `mother_family_name`, `mother_given_name`, `mother_middle_name`, `mother_ext`, `mother_nickname`, `mother_education`, `mother_education_level`, `mother_last_school`, `mother_course`, `mother_year_graduated`, `mother_school_address`, `mother_contact`, `mother_occupation`, `mother_employer`, `mother_income`, `mother_email`, `guardian`, `guardian_family_name`, `guardian_given_name`, `guardian_middle_name`, `guardian_ext`, `guardian_nickname`, `guardian_address`, `guardian_contact`, `guardian_email`, `annual_income`, `schoolLevel`, `schoolLastAttended`, `schoolAddress`, `courseProgram`, `honor`, `generalAverage`, `yearGraduated`, `schoolLevel1`, `schoolLastAttended1`, `schoolAddress1`, `courseProgram1`, `honor1`, `generalAverage1`, `yearGraduated1`, `strand`, `cough`, `colds`, `fever`, `asthma`, `faintingSpells`, `heartDisease`, `tuberculosis`, `frequentHeadaches`, `hernia`, `chronicCough`, `headNeckInjury`, `hiv`, `highBloodPressure`, `diabetesMellitus`, `allergies`, `cancer`, `smokingCigarette`, `alcoholDrinking`, `hospitalized`, `hospitalizationDetails`, `medications`, `hadCovid`, `covidDate`, `vaccine1Brand`, `vaccine1Date`, `vaccine2Brand`, `vaccine2Date`, `booster1Brand`, `booster1Date`, `booster2Brand`, `booster2Date`, `chestXray`, `cbc`, `urinalysis`, `otherworkups`, `symptomsToday`, `remarks`, `termsOfAgreement`) VALUES
(1, '1_1by1_2025.jpg', 0, 'Undergraduate', 'Freshman (First Year)', NULL, '6', '6', 'First Year', 'Does', 'Johncena15', 'MichaelHello', 'V', 'Johnny', '5\'11', '65kg', '1234567890', 0, 0, 0, '', '', '2003-06-20', 21, 'Manila, Philippines', 'Tagalog, English', 'FILIPINO', 'Born Again', 'Single', 'Agta', '09171234567999999', 'johndoe@email.com', '19 G Dona Yayang Street ', 'Libis', '1000', 'National Capital Region (NCR)', 'Metro Manila, Second District', 'Quezon City', 'DSWD123456', 0, '19 G Dona Yayang Street ', 'Libis', '1000', 'National Capital Region (NCR)', 'Metro Manila, Second District', 'Quezon City', 'DSWD123456', 0, 0, 'Doe Sr.', 'Jonathan', 'Smiths', 'III', 'Jon', 0, '', '', '', '', '', '09181234567', 'Engineer', 'ABC Corp', '50000', 'jon.doe@abc.com', 0, 'Jane', 'Mary', 'Anne', '', 'Janey', 0, '', '', '', '', '', '09221234567', 'Accountant', 'XYZ Corp', '45000', 'jane.doe@xyz.com', 'StepFather', 'Parker', 'Ben', 'Jose', 'IV', 'Benny', '789 Recto Av', '09192233445', '', '80,000 and below', 'Senior High School', 'CGEAHS', 'Pasig City', 'STEM', 'With Honors', 92.50, 2022, 'Senior High School', 'CGEAHS', 'Rizal High School', 'Rizal High School', '', 100.00, 0, 'Information and Communications Technology (ICT)', 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'Wala ngani', 'Vitamins C', 1, '2022-02-11', 'Pfizer', '2022-03-14', 'Pfizer', '2022-04-13', 'Moderna', '2022-07-14', 'Pfizer', '2023-01-14', 'Normal', 'Normal', 'Normal', 'Normal', 1, 'Fit to enroll', 1),
(3, '3_1by1_2025.jpg', 1, 'Techvoc', 'Freshman (First Year)', '7', '4', '3', 'First Year', 'Montano', 'Mark Anthony', 'p.', '', 'MARK', '5\'11', '65', '123456789012', NULL, 0, NULL, '', '', '2003-06-26', 21, 'Manila, Philippines', 'Tagalog, English', 'ALGERIAN', 'Iglesia Ni Cristo', 'Single', 'Cebuano', '09953242510', 'montano.ma.bsinfotech@gmail.com', '19 G Dona yayang Street Libis', 'Pag-asa', '4100', 'National Capital Region (NCR)', 'Metro Manila, Second District', 'City Of Mandaluyong', 'DSWD123456', NULL, '19 G Dona yayang Street Libis', 'Malipayon', '4100', 'Region X (Northern Mindanao)', 'Bukidnon', 'Pangantucan', 'DSWD123456', 0, 0, '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0.00, 0, '', '', '', '', '', 0.00, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', 0),
(2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Torres', 'Aira Lorainne', 'S', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Ciruela', 'Genny', 'D.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Dela Cruz', 'Lloyd Cedrick', 'P.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `prof_table`
--

CREATE TABLE `prof_table` (
  `prof_id` int(11) NOT NULL,
  `person_id` int(11) DEFAULT NULL,
  `profile_image` varchar(255) NOT NULL,
  `fname` varchar(100) DEFAULT NULL,
  `mname` varchar(100) DEFAULT NULL,
  `lname` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 0 CHECK (`status` in (0,1)),
  `role` enum('applicant','faculty','superadmin') NOT NULL DEFAULT 'faculty'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prof_table`
--

INSERT INTO `prof_table` (`prof_id`, `person_id`, `profile_image`, `fname`, `mname`, `lname`, `email`, `password`, `status`, `role`) VALUES
(1, NULL, '', 'Hazel', 'Fogata', 'Anuncio', 'hazel.anuncio@earist.edu.ph', 'ANUNCIO', 0, 'faculty'),
(2, NULL, '', 'Eleazar', 'B.', 'Bernales', 'eleazar.bernales@earist.edu.ph', 'BERNALES', 0, 'faculty'),
(3, NULL, '', 'Lester', 'Dela Cruz', 'Bernardino', 'lester.bernardino@earist.edu.ph', 'BERNARDINO', 0, 'faculty'),
(4, NULL, '', 'Carlito', '', 'Biares', 'carlito.biares@earist.edu.ph', 'BIARES', 0, 'faculty'),
(5, NULL, '', 'James Darryl', 'Dela Cruz', 'Bungay', 'james.bungay@earist.edu.ph', 'BUNGAY', 0, 'faculty'),
(6, NULL, '', 'Renz Angelo', 'De Vera', 'Cadaoas', 'renz.cadaoas@earist.edu.ph', 'CADAOAS', 0, 'faculty'),
(7, NULL, '', 'Nerissa', 'Bugarin', 'Capili', 'nerissa.capili@earist.edu.ph', 'CAPILI', 0, 'faculty'),
(8, NULL, '', 'Romeo', 'B.', 'Capucao', 'romeo.capucao@earist.edu.ph', 'CAPUCAO', 0, 'faculty'),
(9, NULL, '', 'Ernanie', 'Molina', 'Carlos', 'ernanie.carlos@earist.edu.ph', 'CARLOS', 0, 'faculty'),
(10, NULL, '', 'Harold', 'Aspa', 'Casimira', 'harold.casimira@earist.edu.ph', 'CASIMIRA', 0, 'faculty'),
(11, NULL, '', 'Rosel', 'Ortiz', 'Cipriano', 'rosel.cipriano@earist.edu.ph', 'CIPRIANO', 0, 'faculty'),
(12, NULL, '', 'Janchloe', 'M', 'Duyan', 'janchloe.duyan@earist.edu.ph', 'DUYAN', 0, 'faculty'),
(13, NULL, '', 'Arlene', 'Peña', 'Evangelista', 'arlene.evangelista@earist.edu.ph', 'EVANGELISTA', 0, 'faculty'),
(14, NULL, '', 'Joevelyn', 'Waje', 'Fajardo', 'joevelyn.fajardo@earist.edu.ph', 'FAJARDO', 0, 'faculty'),
(15, NULL, '', 'Dennis', 'Berboso', 'Gonzales', 'dennis.gonzales@earist.edu.ph', 'GONZALES', 0, 'faculty'),
(16, NULL, '', 'Merlita', 'Cruz', 'Latip', 'merlita.latip@earist.edu.ph', 'LATIP', 0, 'faculty'),
(17, NULL, '', 'Reeneir', 'Ramos', 'Ledesma', 'reeneir.ledesma@earist.edu.ph', 'LEDESMA', 0, 'faculty'),
(18, NULL, '', 'Dennis', 'Dela Peña', 'Mangubat', 'dennis.mangubat@earist.edu.ph', 'MANGUBAT', 0, 'faculty'),
(19, NULL, '', 'Sheila Marie', 'Mobo', 'Matias', 'sheila.matias@earist.edu.ph', 'MATIAS', 0, 'faculty'),
(20, NULL, '', 'Joseph', 'Tarrayo', 'Moraca', 'joseph.moraca@earist.edu.ph', 'MORACA', 0, 'faculty'),
(21, NULL, '', 'Ruth Lareza', 'Aguilar', 'Morales', 'ruth.morales@earist.edu.ph', 'MORALES', 0, 'faculty'),
(22, NULL, '', 'Mark Kenneth', 'Barnobal', 'Nicart', 'mark.nicart@earist.edu.ph', 'NICART', 0, 'faculty'),
(23, NULL, '', 'Rodora', 'Tanglao', 'Oliveros', 'rodora.oliveros@earist.edu.ph', 'OLIVEROS', 0, 'faculty'),
(24, NULL, '', 'Abigail', 'J.', 'Purificacion', 'abigail.purificacion@earist.edu.ph', 'PURIFICACION', 0, 'faculty'),
(25, NULL, '', 'Raynald', 'C', 'Redondo', 'raynald.redondo@earist.edu.ph', 'REDONDO', 0, 'faculty'),
(26, NULL, '', 'Hiromi', '', 'Rivas', 'hiromi.rivas@earist.edu.ph', 'RIVAS', 0, 'faculty'),
(27, NULL, '', 'Eula Luz Jasmine Dioneo', '', 'Sandoval', 'eula.sandoval@earist.edu.ph', 'SANDOVAL', 0, 'faculty'),
(28, NULL, '', 'Al', 'Ferrer', 'Santiago', 'al.santiago@earist.edu.ph', 'SANTIAGO', 0, 'faculty'),
(29, NULL, '', 'Larex', 'Bartolome', 'Tagalog', 'larex.tagalog@earist.edu.ph', 'TAGALOG', 0, 'faculty'),
(30, NULL, '', 'Jayson', 'D.', 'Tolentino', 'jayson.tolentino@earist.edu.ph', 'TOLENTINO', 0, 'faculty'),
(31, NULL, '', 'Edmund Sinagub', NULL, 'Almazan', 'edmund.almazan@earist.edu.ph', 'ALMAZAN', 0, 'faculty'),
(32, NULL, '', 'Jesus', 'de los Santos', 'Paguigan', 'jesus.paguigan@earist.edu.ph', 'PAGUIGAN', 0, 'faculty'),
(33, NULL, '', 'Kathleen', NULL, 'Dimaano', 'kathleen.dimaano@earist.edu.ph', 'DIMAANO', 0, 'faculty'),
(34, NULL, '', 'Charlene', NULL, 'Ronda', 'charlene.ronda@earist.edu.ph', 'RONDA', 0, 'faculty'),
(35, NULL, '', 'Maria Jasmine', NULL, 'Macasil', 'jasmine.macasil@earist.edu.ph', 'MACASIL', 0, 'faculty'),
(36, NULL, '', 'Jefferson', NULL, 'Costales', 'jefferson.costales@earist.edu.ph', 'COSTALES', 0, 'faculty'),
(37, NULL, '', 'Arjo', NULL, 'Ladia', 'arjo.ladia@earist.edu.ph', 'LADIA', 0, 'faculty');

-- --------------------------------------------------------

--
-- Table structure for table `program_table`
--

CREATE TABLE `program_table` (
  `program_id` int(11) NOT NULL,
  `program_description` varchar(255) DEFAULT NULL,
  `program_code` varchar(100) DEFAULT NULL,
  `major` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program_table`
--

INSERT INTO `program_table` (`program_id`, `program_description`, `program_code`, `major`) VALUES
(1, 'Bachelor of Science in Architecture', 'BS ARCHI.', NULL),
(2, 'Bachelor of Science in Interior Design', 'BSID', NULL),
(3, 'Bachelor in Fine Arts Major in Painting', 'BFA-PAINT', 'Painting'),
(4, 'Bachelor in Fine Arts Major in Visual Communication', 'BFA-VISCOM', 'Visual Communication'),
(5, 'Bachelor of Science in Applied Physics with Computer Science Emphasis', 'BSAP', NULL),
(6, 'Bachelor of Science in Psychology', 'BSPSYCH', NULL),
(7, 'Bachelor of Science in Mathematics', 'BSMATH', NULL),
(8, 'Bachelor of Science in Business Administration Major in Marketing Management', 'BSBA-MM', 'Marketing Management'),
(9, 'Bachelor of Science in Business Administration Major in HR Development Management', 'BSBA-HRDM', 'Human Resource Development Management '),
(10, 'Bachelor of Science in Entrepreneurship', 'BSEM', NULL),
(11, 'Bachelor of Science in Office Administration', 'BSOA', NULL),
(12, 'Bachelor of Science in Criminology', 'BSCRIM', NULL),
(13, 'Bachelor of Science in Computer Science', 'BSCS', NULL),
(14, 'Bachelor of Science in Information Technology', 'BS INFOTECH', NULL),
(15, 'Bachelor in Secondary Education Major in Science', 'BSE-SCI', 'Science'),
(16, 'Bachelor in Secondary Education Major in Mathematics', 'BSE-MATH', 'Mathematics'),
(17, 'Bachelor in Secondary Education Major in Filipino', 'BSE-FIL', 'Filipino'),
(18, 'Bachelor in Special Needs Education', 'BSNEd', NULL),
(19, 'Bachelor in Technology and Livelihood Education Major in Home Economics', 'BTLE-HE', 'Home Economics'),
(20, 'Bachelor in Technology and Livelihood Education Major in Industrial Arts', 'BTLE-IA', 'Industrial Arts'),
(21, 'Professional Education Subjects (TCP)', 'TCP', NULL),
(22, 'Bachelor in Public Administration', 'BPA', NULL),
(23, 'Bachelor of Science in Chemical Engineering', 'BSCHE', NULL),
(24, 'Bachelor of Science in Civil Engineering', 'BSCE', NULL),
(25, 'Bachelor of Science in Electrical Engineering', 'BSEE', NULL),
(26, 'Bachelor of Science in Electronics and Communication Engineering', 'BSECE', NULL),
(27, 'Bachelor of Science in Mechanical Engineering', 'BSME', NULL),
(28, 'Bachelor of Science in Computer Engineering', 'BSCOE', NULL),
(29, 'Bachelor of Science in Tourism Management', 'BST', NULL),
(30, 'Bachelor of Science in Hospitality Management', 'BSHM', NULL),
(31, 'Bachelor of Science in Industrial Technology Major in Automotive Technology', 'BSIT-AUTO', 'Automotive Technology'),
(32, 'Bachelor of Science in Industrial Technology Major in Electrical Technology', 'BSIT-ELEC', 'Electrical Technology'),
(33, 'Bachelor of Science in Industrial Technology Major in Electronics Technology', 'BSIT-ET', 'Electronics Technology'),
(34, 'Bachelor of Science in Industrial Technology Major in Food Technology', 'BSIT-FOOD', 'Food Technology\n'),
(35, 'Bachelor of Science in Industrial Technology Major in Fashion and Apparel Technology', 'BSIT-FASHION', 'Fashion and Apparel Technology'),
(36, 'Bachelor of Science in Industrial Technology Major in Industrial Chemistry', 'BSIT-CHEM', 'Industrial Chemistry'),
(37, 'Bachelor of Science in Industrial Technology Major in Drafting Technology', 'BSIT-DRAFT', 'Drafting Technology'),
(38, 'Bachelor of Science in Industrial Technology Major in Machine Shop Technology', 'BSIT-MECH', 'Machine Shop Technology\n'),
(39, 'Bachelor of Science in Industrial Technology Major in Refrigeration and Air Conditioning', 'BSIT-RAC', 'Refrigeration and Air Conditioning'),
(40, 'Bachelor of Science Major in Chemical Engineering', 'BSCE', NULL),
(41, 'Bachelor of Science Major in Fine Arts', 'BSFA', NULL),
(42, 'Bachelor of Science in Fine Arts Major in External Design', 'BSFAMED', NULL),
(43, 'Doctor of Philosophy Industrial Psychology', NULL, 'Industrial Psychology'),
(44, 'Doctor of Education Educational Management', NULL, 'Educational Management'),
(45, 'Doctor in Business Administration', NULL, NULL),
(46, 'Doctor in Public Administration', NULL, NULL),
(47, 'Master of Science in Mathematics', NULL, NULL),
(48, 'Master of Arts in Industrial Psychology', NULL, NULL),
(49, 'Master in Business Administration', NULL, NULL),
(50, 'Master in Public Administration', NULL, NULL),
(51, 'Master of Arts in Industrial Education Hotel Management', NULL, 'Hotel Management'),
(52, 'Master of Arts in Education Administration and Supervision', NULL, 'Administration and Supervision'),
(53, 'Master of Arts in Education Guidance and Counseling', NULL, 'Guidance and Counseling'),
(54, 'Master of Arts in Education Special Education', NULL, 'Special Education'),
(55, 'Master of Arts in Teaching Electronics Technology', NULL, 'Electronics Technology'),
(56, 'Master of Arts in Teaching Mathematics', NULL, 'Mathematics'),
(57, 'Master of Arts in Teaching Science', NULL, 'Science');

-- --------------------------------------------------------

--
-- Table structure for table `program_tagging_table`
--

CREATE TABLE `program_tagging_table` (
  `program_tagging_id` int(11) NOT NULL,
  `curriculum_id` int(11) DEFAULT NULL,
  `year_level_id` int(11) DEFAULT NULL,
  `semester_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program_tagging_table`
--

INSERT INTO `program_tagging_table` (`program_tagging_id`, `curriculum_id`, `year_level_id`, `semester_id`, `course_id`) VALUES
(1, 1, 1, 1, 1),
(2, 1, 1, 1, 2),
(3, 1, 1, 1, 3),
(4, 1, 1, 1, 4),
(5, 1, 1, 1, 5),
(6, 1, 1, 1, 6),
(7, 1, 1, 1, 7),
(8, 1, 1, 1, 8),
(9, 1, 1, 1, 9),
(10, 1, 1, 1, 10),
(11, 1, 1, 1, 11),
(12, 1, 1, 2, 12),
(13, 1, 1, 2, 13),
(14, 1, 1, 2, 14),
(15, 1, 1, 2, 15),
(16, 1, 1, 2, 16),
(17, 1, 1, 2, 17),
(18, 1, 1, 2, 18),
(19, 1, 1, 2, 19),
(20, 1, 1, 2, 20),
(21, 1, 1, 2, 21),
(22, 1, 1, 2, 22),
(23, 1, 2, 1, 23),
(24, 1, 2, 1, 24),
(25, 1, 2, 1, 25),
(26, 1, 2, 1, 26),
(27, 1, 2, 1, 27),
(28, 1, 2, 1, 28),
(29, 1, 2, 1, 29),
(30, 1, 2, 1, 30),
(31, 1, 2, 1, 31),
(32, 1, 2, 1, 32),
(33, 1, 2, 1, 33),
(34, 1, 2, 2, 34),
(35, 1, 2, 2, 35),
(36, 1, 2, 2, 36),
(37, 1, 2, 2, 37),
(38, 1, 2, 2, 38),
(39, 1, 2, 2, 39),
(40, 1, 2, 2, 40),
(41, 1, 2, 2, 41),
(42, 1, 2, 2, 42),
(43, 1, 2, 2, 43),
(44, 1, 2, 2, 44),
(45, 1, 2, 2, 45),
(46, 1, 3, 1, 46),
(47, 1, 3, 1, 47),
(48, 1, 3, 1, 48),
(49, 1, 3, 1, 49),
(50, 1, 3, 1, 50),
(51, 1, 3, 1, 51),
(52, 1, 3, 1, 52),
(53, 1, 3, 1, 53),
(54, 1, 3, 1, 54),
(55, 1, 3, 1, 55),
(56, 1, 3, 1, 56),
(57, 1, 3, 2, 57),
(58, 1, 3, 2, 58),
(59, 1, 3, 2, 59),
(60, 1, 3, 2, 60),
(61, 1, 3, 2, 61),
(62, 1, 3, 2, 62),
(63, 1, 3, 2, 63),
(64, 1, 3, 2, 64),
(65, 1, 3, 2, 65),
(66, 1, 3, 2, 66),
(67, 1, 4, 1, 67),
(68, 1, 4, 1, 68),
(69, 1, 4, 1, 69),
(70, 1, 4, 1, 70),
(71, 1, 4, 1, 71),
(72, 1, 4, 1, 72),
(73, 1, 4, 1, 73),
(74, 1, 4, 1, 74),
(75, 1, 4, 1, 75),
(76, 1, 4, 1, 76),
(77, 1, 4, 2, 77),
(78, 2, 3, 2, 71),
(79, 4, 1, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `requirements_table`
--

CREATE TABLE `requirements_table` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requirements_table`
--

INSERT INTO `requirements_table` (`id`, `description`) VALUES
(1, 'Original and Photocopy of high school report card (form 138) duly signed by the school Principal and/or Registrar'),
(2, 'Original and Photocopy of Certificate of Good Moral Character'),
(3, 'Original and Photocopy of NSO Birth Certificate'),
(4, 'Certification from School Principal and/or Registrar with School\'s dry seal that no copy of applicant\'s form 137 has been sent to other College or University');

-- --------------------------------------------------------

--
-- Table structure for table `requirement_uploads`
--

CREATE TABLE `requirement_uploads` (
  `upload_id` int(11) NOT NULL,
  `requirements_id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `room_day_table`
--

CREATE TABLE `room_day_table` (
  `id` int(11) NOT NULL,
  `description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room_day_table`
--

INSERT INTO `room_day_table` (`id`, `description`) VALUES
(1, 'SUN'),
(2, 'MON'),
(3, 'TUE'),
(4, 'WED'),
(5, 'THU'),
(6, 'FRI'),
(7, 'SAT');

-- --------------------------------------------------------

--
-- Table structure for table `room_table`
--

CREATE TABLE `room_table` (
  `room_id` int(11) NOT NULL,
  `room_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room_table`
--

INSERT INTO `room_table` (`room_id`, `room_description`) VALUES
(1, 'CCS Room 201'),
(2, 'CCS Room 202'),
(3, 'CCS Room 301'),
(4, 'CCS Room 302'),
(5, 'CCS Room 303'),
(11, 'CSS Room 203'),
(12, 'CAS Room 204'),
(13, 'CAS Room 401'),
(14, 'CAS Room 402'),
(15, 'CAS Room 403'),
(16, 'CAS Room 404'),
(17, 'CAS Room 405'),
(18, 'CAS Room 406'),
(19, 'CAS Room 409'),
(20, 'CAS Room 411');

-- --------------------------------------------------------

--
-- Table structure for table `school_time_table`
--

CREATE TABLE `school_time_table` (
  `id` int(11) NOT NULL,
  `description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `school_time_table`
--

INSERT INTO `school_time_table` (`id`, `description`) VALUES
(1, '07:00 AM'),
(2, '07:30 AM'),
(3, '08:00 AM'),
(4, '08:30 AM'),
(5, '09:00 AM'),
(6, '09:30 AM'),
(7, '10:00 AM'),
(8, '10:30 AM'),
(9, '11:00 AM'),
(10, '11:30 AM'),
(11, '12:00 PM'),
(12, '12:30 PM'),
(13, '01:00 PM'),
(14, '01:30 PM'),
(15, '02:00 PM'),
(16, '02:30 PM'),
(17, '03:00 PM'),
(18, '03:30 PM'),
(19, '04:00 PM'),
(20, '04:30 PM'),
(21, '05:00 PM'),
(22, '05:30 PM'),
(23, '06:00 PM'),
(24, '06:30 PM'),
(25, '07:00 PM'),
(26, '07:30 PM'),
(27, '08:00 PM'),
(28, '08:30 PM'),
(29, '09:00 PM');

-- --------------------------------------------------------

--
-- Table structure for table `section_table`
--

CREATE TABLE `section_table` (
  `id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `section_table`
--

INSERT INTO `section_table` (`id`, `description`) VALUES
(1, '1A'),
(2, '1B'),
(3, '1C'),
(4, '2A'),
(5, '2B'),
(6, '2C'),
(7, '3A'),
(8, '3B'),
(9, '3C'),
(10, '4A'),
(11, '4B'),
(12, '4C');

-- --------------------------------------------------------

--
-- Table structure for table `semester_table`
--

CREATE TABLE `semester_table` (
  `semester_id` int(11) NOT NULL,
  `semester_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `semester_table`
--

INSERT INTO `semester_table` (`semester_id`, `semester_description`) VALUES
(1, '1st Semester'),
(2, '2nd Semester'),
(3, 'Summer'),
(5, '3rd Semester'),
(6, '4th Semester');

-- --------------------------------------------------------

--
-- Table structure for table `student_counter`
--

CREATE TABLE `student_counter` (
  `id` int(11) NOT NULL,
  `que_number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_counter`
--

INSERT INTO `student_counter` (`id`, `que_number`) VALUES
(1, 14),
(2, 14);

-- --------------------------------------------------------

--
-- Table structure for table `student_curriculum_table`
--

CREATE TABLE `student_curriculum_table` (
  `id` int(11) NOT NULL,
  `student_numbering_id` int(11) DEFAULT NULL,
  `curriculum_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_grade_overall_table`
--

CREATE TABLE `student_grade_overall_table` (
  `id` int(11) NOT NULL,
  `student_number` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `final_grade` decimal(2,2) NOT NULL,
  `active_school_year_id` int(11) NOT NULL,
  `remarks` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_grade_overall_table`
--

INSERT INTO `student_grade_overall_table` (`id`, `student_number`, `course_id`, `final_grade`, `active_school_year_id`, `remarks`) VALUES
(1, 224095240, 1, 0.99, 2, 1),
(2, 224091140, 2, 0.99, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `student_numbering_table`
--

CREATE TABLE `student_numbering_table` (
  `student_number` int(11) NOT NULL,
  `person_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_numbering_table`
--

INSERT INTO `student_numbering_table` (`student_number`, `person_id`) VALUES
(202400012, 3),
(202400013, 1),
(202400014, 2);

-- --------------------------------------------------------

--
-- Table structure for table `student_status_table`
--

CREATE TABLE `student_status_table` (
  `id` int(11) NOT NULL,
  `student_number` int(11) DEFAULT NULL,
  `active_curriculum` int(11) DEFAULT NULL,
  `enrolled_status` varchar(11) DEFAULT NULL,
  `year_level_id` int(11) DEFAULT NULL,
  `active_school_year_id` int(11) DEFAULT NULL,
  `control_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_status_table`
--

INSERT INTO `student_status_table` (`id`, `student_number`, `active_curriculum`, `enrolled_status`, `year_level_id`, `active_school_year_id`, `control_status`) VALUES
(5, 202400012, 1, '1', 1, 1, 0),
(6, 202400013, 1, '1', 1, 1, 0),
(7, 202400014, 1, '1', 1, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `time_table`
--

CREATE TABLE `time_table` (
  `id` int(11) NOT NULL,
  `room_day` int(11) DEFAULT NULL,
  `school_time_start` varchar(11) DEFAULT NULL,
  `school_time_end` varchar(11) DEFAULT NULL,
  `department_section_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `professor_id` int(11) DEFAULT NULL,
  `department_room_id` int(11) DEFAULT NULL,
  `school_year_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `time_table`
--

INSERT INTO `time_table` (`id`, `room_day`, `school_time_start`, `school_time_end`, `department_section_id`, `course_id`, `professor_id`, `department_room_id`, `school_year_id`) VALUES
(8, 2, '8:00 AM', '10:00 AM', 1, 3, 40, 3, 3),
(9, 3, '11:00 AM', '2:00 PM', 1, 20, 40, 5, 4),
(10, 5, '7:00 AM', '10:00 AM', 2, 7, 40, 4, 6),
(11, 4, '9:00 AM', '12:00 PM', 1, 5, 40, 4, 4),
(12, 6, '10:00 AM', '1:00 PM', 1, 3, 40, 4, 4),
(13, 1, '9:16 AM', '11:15 AM', 1, 2, 38, 3, 1),
(14, 1, '9:52 PM', '11:52 PM', 1, 1, 1, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_accounts`
--

CREATE TABLE `user_accounts` (
  `id` int(11) NOT NULL,
  `person_id` int(11) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_accounts`
--

INSERT INTO `user_accounts` (`id`, `person_id`, `role`, `email`, `password`) VALUES
(1, 20, 'registrar', 'Ardenmecasio21@gmail.com', '$2b$10$PqmUKA45xobzdMZHx8U2/Of/YSRAgop.8FwuMCOtixY3bQNxMAGaO'),
(2, 4, 'student', 'ardenhello@gmail.com', '$2b$10$dxs3rjyLGQtPIeDpyeAUTOsViqjJWC6ZYb1uhlWSZLePjvPOj/qZ.');

-- --------------------------------------------------------

--
-- Table structure for table `year_level_table`
--

CREATE TABLE `year_level_table` (
  `year_level_id` int(11) NOT NULL,
  `year_level_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `year_level_table`
--

INSERT INTO `year_level_table` (`year_level_id`, `year_level_description`) VALUES
(1, '1st Year'),
(2, '2nd Year'),
(3, '3rd Year'),
(4, '4th Year'),
(5, '5th Year');

-- --------------------------------------------------------

--
-- Table structure for table `year_table`
--

CREATE TABLE `year_table` (
  `year_id` int(11) NOT NULL,
  `year_description` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `year_table`
--

INSERT INTO `year_table` (`year_id`, `year_description`, `status`) VALUES
(1, '2021', 0),
(2, '2022', 0),
(3, '2023', 0),
(4, '2024', 1),
(9, '2025', 0),
(10, '2026', 0),
(11, '2027', 0),
(13, '2029', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `active_school_year_table`
--
ALTER TABLE `active_school_year_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `year_id` (`year_id`),
  ADD KEY `semester_id` (`semester_id`);

--
-- Indexes for table `course_table`
--
ALTER TABLE `course_table`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `curriculum_table`
--
ALTER TABLE `curriculum_table`
  ADD PRIMARY KEY (`curriculum_id`),
  ADD KEY `year_id` (`year_id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `dprtmnt_curriculum_table`
--
ALTER TABLE `dprtmnt_curriculum_table`
  ADD PRIMARY KEY (`dprtmnt_curriculum_id`),
  ADD KEY `dprtmnt_id` (`dprtmnt_id`),
  ADD KEY `curriculum_id` (`curriculum_id`);

--
-- Indexes for table `dprtmnt_profs_table`
--
ALTER TABLE `dprtmnt_profs_table`
  ADD PRIMARY KEY (`dprtmnt_profs_id`),
  ADD KEY `dprtmnt_id` (`dprtmnt_id`),
  ADD KEY `prof_id` (`prof_id`);

--
-- Indexes for table `dprtmnt_room_table`
--
ALTER TABLE `dprtmnt_room_table`
  ADD PRIMARY KEY (`dprtmnt_room_id`),
  ADD KEY `dprtmnt_id` (`dprtmnt_id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `dprtmnt_section_table`
--
ALTER TABLE `dprtmnt_section_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `curriculum_id` (`curriculum_id`),
  ADD KEY `section_id` (`section_id`);

--
-- Indexes for table `dprtmnt_table`
--
ALTER TABLE `dprtmnt_table`
  ADD PRIMARY KEY (`dprtmnt_id`);

--
-- Indexes for table `enrolled_subject`
--
ALTER TABLE `enrolled_subject`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `period_status`
--
ALTER TABLE `period_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `person_prof_table`
--
ALTER TABLE `person_prof_table`
  ADD PRIMARY KEY (`person_id`);

--
-- Indexes for table `person_status_table`
--
ALTER TABLE `person_status_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `person_id` (`person_id`);

--
-- Indexes for table `person_table`
--
ALTER TABLE `person_table`
  ADD PRIMARY KEY (`person_id`);

--
-- Indexes for table `prof_table`
--
ALTER TABLE `prof_table`
  ADD PRIMARY KEY (`prof_id`);

--
-- Indexes for table `program_table`
--
ALTER TABLE `program_table`
  ADD PRIMARY KEY (`program_id`);

--
-- Indexes for table `program_tagging_table`
--
ALTER TABLE `program_tagging_table`
  ADD PRIMARY KEY (`program_tagging_id`);

--
-- Indexes for table `requirements_table`
--
ALTER TABLE `requirements_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requirement_uploads`
--
ALTER TABLE `requirement_uploads`
  ADD PRIMARY KEY (`upload_id`);

--
-- Indexes for table `room_day_table`
--
ALTER TABLE `room_day_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room_table`
--
ALTER TABLE `room_table`
  ADD PRIMARY KEY (`room_id`);

--
-- Indexes for table `school_time_table`
--
ALTER TABLE `school_time_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `section_table`
--
ALTER TABLE `section_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `semester_table`
--
ALTER TABLE `semester_table`
  ADD PRIMARY KEY (`semester_id`);

--
-- Indexes for table `student_counter`
--
ALTER TABLE `student_counter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_curriculum_table`
--
ALTER TABLE `student_curriculum_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_grade_overall_table`
--
ALTER TABLE `student_grade_overall_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_numbering_table`
--
ALTER TABLE `student_numbering_table`
  ADD PRIMARY KEY (`student_number`);

--
-- Indexes for table `student_status_table`
--
ALTER TABLE `student_status_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `time_table`
--
ALTER TABLE `time_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_accounts`
--
ALTER TABLE `user_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `year_level_table`
--
ALTER TABLE `year_level_table`
  ADD PRIMARY KEY (`year_level_id`);

--
-- Indexes for table `year_table`
--
ALTER TABLE `year_table`
  ADD PRIMARY KEY (`year_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `active_school_year_table`
--
ALTER TABLE `active_school_year_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `course_table`
--
ALTER TABLE `course_table`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `curriculum_table`
--
ALTER TABLE `curriculum_table`
  MODIFY `curriculum_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `dprtmnt_curriculum_table`
--
ALTER TABLE `dprtmnt_curriculum_table`
  MODIFY `dprtmnt_curriculum_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `dprtmnt_profs_table`
--
ALTER TABLE `dprtmnt_profs_table`
  MODIFY `dprtmnt_profs_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `dprtmnt_room_table`
--
ALTER TABLE `dprtmnt_room_table`
  MODIFY `dprtmnt_room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `dprtmnt_section_table`
--
ALTER TABLE `dprtmnt_section_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=517;

--
-- AUTO_INCREMENT for table `dprtmnt_table`
--
ALTER TABLE `dprtmnt_table`
  MODIFY `dprtmnt_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `enrolled_subject`
--
ALTER TABLE `enrolled_subject`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `period_status`
--
ALTER TABLE `period_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `person_prof_table`
--
ALTER TABLE `person_prof_table`
  MODIFY `person_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `person_status_table`
--
ALTER TABLE `person_status_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `person_table`
--
ALTER TABLE `person_table`
  MODIFY `person_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `prof_table`
--
ALTER TABLE `prof_table`
  MODIFY `prof_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `program_table`
--
ALTER TABLE `program_table`
  MODIFY `program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `program_tagging_table`
--
ALTER TABLE `program_tagging_table`
  MODIFY `program_tagging_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `requirements_table`
--
ALTER TABLE `requirements_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `requirement_uploads`
--
ALTER TABLE `requirement_uploads`
  MODIFY `upload_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `room_day_table`
--
ALTER TABLE `room_day_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `room_table`
--
ALTER TABLE `room_table`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `school_time_table`
--
ALTER TABLE `school_time_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `section_table`
--
ALTER TABLE `section_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `semester_table`
--
ALTER TABLE `semester_table`
  MODIFY `semester_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `student_counter`
--
ALTER TABLE `student_counter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `student_curriculum_table`
--
ALTER TABLE `student_curriculum_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_grade_overall_table`
--
ALTER TABLE `student_grade_overall_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `student_numbering_table`
--
ALTER TABLE `student_numbering_table`
  MODIFY `student_number` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=224095241;

--
-- AUTO_INCREMENT for table `student_status_table`
--
ALTER TABLE `student_status_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `time_table`
--
ALTER TABLE `time_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user_accounts`
--
ALTER TABLE `user_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `year_level_table`
--
ALTER TABLE `year_level_table`
  MODIFY `year_level_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `year_table`
--
ALTER TABLE `year_table`
  MODIFY `year_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
