-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 01, 2025 at 02:29 PM
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
-- Database: `admission`
--

-- --------------------------------------------------------

--
-- Table structure for table `applicant_numbering_table`
--

CREATE TABLE `applicant_numbering_table` (
  `applicant_number` varchar(20) NOT NULL,
  `person_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applicant_numbering_table`
--

INSERT INTO `applicant_numbering_table` (`applicant_number`, `person_id`) VALUES
('2025100001', 1),
('2025100002', 2),
('2025100003', 3),
('2025100004', 203),
('2025100005', 204);

-- --------------------------------------------------------

--
-- Table structure for table `exam_applicants`
--

CREATE TABLE `exam_applicants` (
  `id` int(11) NOT NULL,
  `schedule_id` int(11) DEFAULT NULL,
  `applicant_id` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `exam_schedule`
--

CREATE TABLE `exam_schedule` (
  `exam_id` int(11) NOT NULL,
  `exam_date` date NOT NULL,
  `exam_start_time` varchar(10) NOT NULL,
  `exam_end_time` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exam_schedule`
--

INSERT INTO `exam_schedule` (`exam_id`, `exam_date`, `exam_start_time`, `exam_end_time`) VALUES
(2, '2025-05-21', '12:00', '13:30'),
(3, '2025-05-21', '09:30', '10:30'),
(4, '2025-05-21', '07:00', '21:00');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `type` varchar(20) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `applicant_number` varchar(20) DEFAULT NULL,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `type`, `message`, `applicant_number`, `timestamp`) VALUES
(1, 'update', '✏️ Updated remarks on document (Applicant #2025100005)', '2025100005', '2025-08-01 19:49:11'),
(2, 'upload', '📥 Uploaded new document by Applicant #2025100005', '2025100005', '2025-08-01 19:49:44'),
(3, 'delete', '🗑️ Deleted document (Applicant #2025100005)', '2025100005', '2025-08-01 19:49:54'),
(4, 'upload', '📥 Uploaded new document by Applicant #2025100002', '2025100002', '2025-08-01 20:26:36'),
(5, 'update', '✏️ Updated remarks on document (Applicant #2025100002)', '2025100002', '2025-08-01 20:26:41'),
(6, 'update', '✏️ Updated remarks on document (Applicant #2025100002)', '2025100002', '2025-08-01 20:26:51'),
(7, 'update', '✏️ Updated remarks on document (Applicant #2025100002)', '2025100002', '2025-08-01 20:26:53'),
(8, 'update', '✏️ Updated remarks on document (Applicant #2025100002)', '2025100002', '2025-08-01 20:26:56'),
(9, 'delete', '🗑️ Deleted document (Applicant #2025100002)', '2025100002', '2025-08-01 20:27:02');

-- --------------------------------------------------------

--
-- Table structure for table `person_status_table`
--

CREATE TABLE `person_status_table` (
  `id` int(11) NOT NULL,
  `person_id` int(11) DEFAULT NULL,
  `applicant_id` varchar(20) DEFAULT NULL,
  `exam_status` int(11) DEFAULT NULL,
  `requirements` int(11) DEFAULT NULL,
  `residency` int(11) DEFAULT NULL,
  `student_registration_status` int(11) DEFAULT NULL,
  `exam_result` int(11) DEFAULT NULL,
  `hs_ave` float DEFAULT NULL,
  `qualifying_result` int(11) DEFAULT 0,
  `interview_result` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `person_status_table`
--

INSERT INTO `person_status_table` (`id`, `person_id`, `applicant_id`, `exam_status`, `requirements`, `residency`, `student_registration_status`, `exam_result`, `hs_ave`, `qualifying_result`, `interview_result`) VALUES
(3, 1, '2025100001', 0, 0, 0, 0, 0, 0, 0, 0),
(4, 2, '2025100002', 0, 0, 0, 0, 0, 0, 0, 0),
(5, 3, '2025100003', 0, 0, 0, 0, 0, 0, 0, 0),
(6, 203, '2025100004', 0, 0, 0, 0, 0, 0, 0, 0),
(7, 204, '2025100005', 0, 0, 0, 0, 0, 0, 0, 0);

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
(3, '1_1by1_2025.jpg', 0, 'Undergraduate', 'Freshman (First Year)', '1', '6', '16', 'First Year', 'Montaño', 'Mark Anthony', 'Placido', '', 'Johnny', '5\'11', '65kg', 'No LRN Number', 0, 0, 0, '', '', '2003-06-20', 21, 'Manila, Philippines', 'Tagalog, English', 'FILIPINO', 'Born Again', 'Single', 'Agta', '09171234567999999', 'montano.ma.bsinfotech@gmail.com', '19 G Dona Yayang Street ', 'Libis', '1000', 'National Capital Region (NCR)', 'Metro Manila, Second District', 'Quezon City', 'DSWD123456', 0, '19 G Dona Yayang Street ', 'Libis', '1000', 'National Capital Region (NCR)', 'Metro Manila, Second District', 'Quezon City', 'DSWD123456', 0, 0, 'Doe Sr.', 'Jonathan', 'Smiths', 'III', 'Jon', 0, '', '', '', '', '', '09181234567', 'Engineer', 'ABC Corp', '50000', 'jon.doe@abc.com', 0, 'Jane', 'Mary', 'Anne', '', 'Janey', 0, '', '', '', '', '', '09221234567', 'Accountant', 'XYZ Corp', '100000', 'jane.doe@xyz.com', 'StepFather', 'Parker', 'Ben', 'Jose', 'IV', 'Benny', '789 Recto Av', '09192233445', '', '135,000 to 250,000', 'Senior High School', 'CGEAHS', 'Pasig City', 'STEM', 'With Honors', 92.50, 2022, 'Senior High School', 'CGEAHS', 'Rizal High School', 'Rizal High School', '0', 100.00, 0, 'Information and Communications Technology (ICT)', 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 'Wala ngani', 'Vitamins C', 1, '2022-02-11', 'Pfizer', '2022-03-14', 'Pfizer', '2022-04-13', 'Moderna', '2022-07-14', 'Pfizer', '2023-01-14', 'Normal', 'Normal', 'Normal', 'Normal', 1, 'Fit to enroll', 1),
(2, '3_1by1_2025.jpg', 1, 'Techvoc', 'Freshman (First Year)', '7', '4', '3', 'First Year', 'Montano', 'Mark Anthony', 'p.', '', 'MARK', '5\'11', '65', '123456789012', NULL, 0, NULL, '', '', '2003-06-26', 21, 'Manila, Philippines', 'Tagalog, English', 'ALGERIAN', 'Iglesia Ni Cristo', 'Single', 'Cebuano', '09953242510', 'montano.ma.bsinfotech@gmail.com', '19 G Dona yayang Street Libis', 'Pag-asa', '4100', 'National Capital Region (NCR)', 'Metro Manila, Second District', 'City Of Mandaluyong', 'DSWD123456', NULL, '19 G Dona yayang Street Libis', 'Malipayon', '4100', 'Region X (Northern Mindanao)', 'Bukidnon', 'Pangantucan', 'DSWD123456', 0, 0, '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0.00, 0, '', '', '', '', '', 0.00, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', 0),
(202, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'fasf', 'fasf', 'fsafbh', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'markmontano522@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(201, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2r4qrasf', 'fas', 'dhgdfa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'markmontano0626@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(203, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'gdssdg', 'dfgdf', 'gdsgs', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'markmontano999@gnail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(204, '2025100005_1by1_2025.jpg', 0, '', '', '', '', '', '', 'Montano', 'Mark Anthony', '', '', '', '', '', '', 0, 0, 0, '', '', '', 0, '', '', '', '', '', '', '+639953242510', 'markmontano0626@gmail.com', '19 G Dona yayang Street Libis', '', '4100', '', '', '', '', 0, '', '', '', '', '', '', '', 0, 0, '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0.00, 0, 'Undergraduate', '', '', '', '', 0.00, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', 0);

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
(1, 'PSA Birth Certificate '),
(2, 'Form 138 (4th Quarter / No failing Grades)'),
(3, 'Certificate of Good Moral Character\n'),
(4, 'Certificate belonging to Graduating Class'),
(5, 'Copy of Vaccine Card (1st and 2nd Dose)');

-- --------------------------------------------------------

--
-- Table structure for table `requirement_uploads`
--

CREATE TABLE `requirement_uploads` (
  `upload_id` int(11) NOT NULL,
  `requirements_id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `original_name` varchar(100) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `requirement_uploads`
--

INSERT INTO `requirement_uploads` (`upload_id`, `requirements_id`, `person_id`, `file_path`, `original_name`, `remarks`, `status`, `created_at`) VALUES
(86, 1, 5, '/uploads/1_BirthCertificate_2025.pdf', 'Mark.pdf', NULL, NULL, '2025-07-30 06:10:06'),
(98, 1, 204, '/uploads/2025100005_BirthCertificate_2025.pdf', 'Recommendation-MIS-new-SA-7-2025.pdf', 'okay', 1, '2025-07-31 18:40:02'),
(100, 2, 204, '2025100005_Form138_2025.pdf', 'Mark.pdf', 'pwede na ngani', 1, '2025-08-01 05:35:29');

-- --------------------------------------------------------

--
-- Table structure for table `user_accounts`
--

CREATE TABLE `user_accounts` (
  `user_id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'applicant'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_accounts`
--

INSERT INTO `user_accounts` (`user_id`, `person_id`, `email`, `password`, `role`) VALUES
(1, 1, 'markmontano062612@gmail.com', '$2b$10$5rUrkZBlaGtCEEiUom4Xje.gtHrc1yflvmrvpM1Ta0Dddc9JlMhaW', 'applicant'),
(3, 3, 'markmontano522@gmail.com', '$2b$10$hJNpIw30sDIf//yJhKTHMeJBSfViDPMekU.PFIRddFBTAutf6LUXe', 'applicant'),
(4, 203, 'markmontano999@gmail.com', '$2b$10$Tv7T1Xef2rCR4Or393RAFO7TlieuGpphssi0EfRqc77gaaB0lisNe', 'applicant'),
(5, 204, 'markmontano0626@gmail.com', '$2b$10$kA0cvwiID5hC44C03ldCIelJ3qR8YT1puu8YJYlrCmi6tc2Uqx.p2', 'applicant');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applicant_numbering_table`
--
ALTER TABLE `applicant_numbering_table`
  ADD PRIMARY KEY (`applicant_number`),
  ADD UNIQUE KEY `person_id` (`person_id`);

--
-- Indexes for table `exam_applicants`
--
ALTER TABLE `exam_applicants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exam_schedule`
--
ALTER TABLE `exam_schedule`
  ADD PRIMARY KEY (`exam_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `person_status_table`
--
ALTER TABLE `person_status_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `person_table`
--
ALTER TABLE `person_table`
  ADD PRIMARY KEY (`person_id`);

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
-- Indexes for table `user_accounts`
--
ALTER TABLE `user_accounts`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `person_id` (`person_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exam_applicants`
--
ALTER TABLE `exam_applicants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `exam_schedule`
--
ALTER TABLE `exam_schedule`
  MODIFY `exam_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `person_status_table`
--
ALTER TABLE `person_status_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `person_table`
--
ALTER TABLE `person_table`
  MODIFY `person_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;

--
-- AUTO_INCREMENT for table `requirements_table`
--
ALTER TABLE `requirements_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `requirement_uploads`
--
ALTER TABLE `requirement_uploads`
  MODIFY `upload_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `user_accounts`
--
ALTER TABLE `user_accounts`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
