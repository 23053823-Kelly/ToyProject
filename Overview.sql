-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2024 at 08:44 AM
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
-- Database: `c237_toyapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `bankaccount`
--

CREATE TABLE `bankaccount` (
  `bankaccountid` int(10) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `accountnumber` int(20) NOT NULL,
  `routingnumber` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `contactid` int(10) NOT NULL,
  `name` varchar(1000) NOT NULL,
  `email` varchar(1000) NOT NULL,
  `phone` int(8) NOT NULL,
  `comments` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`contactid`, `name`, `email`, `phone`, `comments`) VALUES
(1, 'kelly', '23053823@myrp.edu.sg', 12345678, 'abc'),
(2, 'jaren', 'useful@gmail.com', 97629629, 'abc');

-- --------------------------------------------------------

--
-- Table structure for table `creditcard`
--

CREATE TABLE `creditcard` (
  `creditcardid` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `cardnumber` int(11) NOT NULL,
  `expiration` varchar(20) NOT NULL,
  `CVV` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `loginid` int(10) NOT NULL,
  `username` varchar(200) NOT NULL,
  `pswd` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`loginid`, `username`, `pswd`) VALUES
(8, 'oo', 'o'),
(9, '23053823', 'o'),
(10, '23053823', '1234567');

-- --------------------------------------------------------

--
-- Table structure for table `toys`
--

CREATE TABLE `toys` (
  `toyid` int(10) NOT NULL,
  `productName` varchar(200) NOT NULL,
  `agegroup` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `quantity` int(250) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `toys`
--

INSERT INTO `toys` (`toyid`, `productName`, `agegroup`, `description`, `quantity`, `price`, `image`) VALUES
(1, 'Piggy bank', '1-3 Years old', 'A piggy bank is a small container, typically shaped like a pig, used by children to store coins. It serves as a simple savings tool encouraging financial awareness and thrift from a young age.', 150, 5.50, 'piggybankk.webp'),
(2, 'Blocks', '12 months to 5 years old ', 'Blocks never get old, and these are big, so you don’t have to worry about choking hazards or stepping on one by accident. The Mega Bloks bag comes with 80 blocks in different shapes and colors. Kids between 12 months and 5 years old can make endless creations with this fun kit.\r\n', 230, 24.00, 'blocks.webp'),
(3, 'Puzzels', '4 to 6 years old', 'Puzzles are beneficial for children aged 4 to 6 years, promoting cognitive skills, enhancing motor skills, fostering patience, supporting learning, and encouraging social interaction.', 150, 7.90, 'puzzles.webp'),
(4, 'Soft Toys', '4 to 6 years old', 'This soft kitten with its big eyes and friendly face is the world\'s best friend to play with, hug and carry everywhere. Just the right size – even for the smallest children.', 200, 20.00, 'jellycat.jpg'),
(5, 'Board Games', '6 Years old and Above', 'Board games are beneficial for children aged 6 and above as they enhance strategic thinking, promote social skills, encourage patience and turn-taking, improve memory and cognitive skills, and provide opportunities for family bonding and fun.', 180, 8.50, 'boardgame.jpg'),
(6, 'Musical Toy', '1 to 3 Years old', 'Musical toys can make lots of sounds over and over again, which might seem a bit much to parents sometimes. But those sounds can help the children learn to be patient and pay close attention.\r\n', 120, 19.90, 'musical toys.webp'),
(10, 'Applesss', '1 to 3 Years old', 'aa', 100, 9.00, 'blocks.webp');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bankaccount`
--
ALTER TABLE `bankaccount`
  ADD PRIMARY KEY (`bankaccountid`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`contactid`);

--
-- Indexes for table `creditcard`
--
ALTER TABLE `creditcard`
  ADD PRIMARY KEY (`creditcardid`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`loginid`);

--
-- Indexes for table `toys`
--
ALTER TABLE `toys`
  ADD PRIMARY KEY (`toyid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bankaccount`
--
ALTER TABLE `bankaccount`
  MODIFY `bankaccountid` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `contactid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `creditcard`
--
ALTER TABLE `creditcard`
  MODIFY `creditcardid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `loginid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `toys`
--
ALTER TABLE `toys`
  MODIFY `toyid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
