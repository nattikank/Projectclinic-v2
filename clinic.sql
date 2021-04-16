-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Apr 16, 2021 at 02:11 PM
-- Server version: 8.0.16
-- PHP Version: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clinic`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `idchat` int(5) NOT NULL,
  `text` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `iduser` int(5) NOT NULL,
  `type` varchar(20) NOT NULL,
  `idroom` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`idchat`, `text`, `iduser`, `type`, `idroom`) VALUES
(50, 'สวัสดี', 3, 'user', 3),
(51, 'สวัสดีค่ะ คลินิกความงามและผิวพรรณหมอเพื่อน ยินดีให้บริการและให้คำปรึกษาโดยไม่คิดค่าใช้จ่ายค่ะ', 0, 'bot', 3),
(52, 'วันนี้ร้านเปิดมั้ย', 3, 'user', 3),
(53, 'ร้านเปิดทุกวันจันทร์ - อาทิตย์ เวลา 12:30 - 20:30 น.', 0, 'bot', 3),
(54, 'เปิดกี่โมง', 3, 'user', 3),
(55, 'ร้านเปิดทุกวันจันทร์ - อาทิตย์ เวลา 12:30 - 20:30 น.', 0, 'bot', 3),
(56, 'สวัสดีค่ะ', 1, 'user', 1),
(57, 'สวัสดีค่ะ คลินิกความงามและผิวพรรณหมอเพื่อน ยินดีให้บริการและให้คำปรึกษาโดยไม่คิดค่าใช้จ่ายค่ะ', 0, 'bot', 1),
(58, 'โปรโมชั่นเดือนนี้', 1, 'user', 1),
(59, 'ขออถัยบอทยังไม่รู้จักคำที่คุณถามเข้ามาค่ะ', 0, 'bot', 1),
(60, 'โปรโมชั่น', 1, 'user', 1),
(61, 'โปรโมชั่นเดือน ตุลาคม 2562\n        - Botox กราม + Fat แก้มเหนียง 9,500\n        - Botox ลิฟท์หน้า + Fat แก้ม 9,500\n        - Botox ริ้วรอย + Filler ร่องแก้ม 12,900\n        - ร้อยไหมลดโหนก + Botox กราม 12,500\n        - Botox ริ้วรอย + Filler ใต้ตา 20,900\n        พิเศษ ซื้อ 1 โปร Share & Check-in รับฟรี!! ฉายแสง หน้าใส Proton Beam 1 ครั้ง', 0, 'bot', 1);

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `idcontact` int(11) NOT NULL,
  `firstnameCon` varchar(100) NOT NULL,
  `lastnameCon` varchar(100) NOT NULL,
  `emailCon` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `msgCon` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`idcontact`, `firstnameCon`, `lastnameCon`, `emailCon`, `msgCon`) VALUES
(2, 'fah', 'kan', 'fahcon@hotmail.com', 'อยากติดต่อสอบถามเรื่องสิวค่ะ'),
(14, 'กุลธรา', 'บุญทวี', 'kul@hotmail.com', 'สอบถามเพิ่มเติมเกี่ยวกับการรักษาสิวจ้า');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `idcourse` int(11) NOT NULL,
  `course_name` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `descriptionCourse` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `price` varchar(10) NOT NULL,
  `img` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `time_course` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`idcourse`, `course_name`, `descriptionCourse`, `price`, `img`, `time_course`) VALUES
(1, 'Bright Booster จาก1,500 พิเศษราคานักศึกษา 750', 'Bright Booster จาก1,500 พิเศษราคานักศึกษา 750  ', '750', '/public/uploads/IMAGE-1584359950399.png', '2'),
(2, 'ฉีดสิว/กดสิว,เม็ดแรก 150 เม็ดต่อไป 50+', 'ฉีดสิว/กดสิว,เม็ดแรก 150 เม็ดต่อไป 50+', '150+', '/public/uploads/IMAGE-1580066389716.jpg', '2'),
(3, 'Aura Booster คอร์ส 5 ครั้ง 13,500', 'Aura Booster คอร์ส 5 ครั้ง 13,500', '13500', '/public/uploads/Logo.png', '2'),
(4, 'Dermabrasion สะกิดหลุมสิว,ผลัก Growth factor 2,500', 'Dermabrasion สะกิดหลุมสิว,ผลัก Growth factor 2,500', '2500', '/public/uploads/Logo.png', '2'),
(5, 'Subcision รักษาหลุมสิว ตัดผังผืดใต้ผิวหนัง. 3,500', 'Subcision รักษาหลุมสิว ตัดผังผืดใต้ผิวหนัง. 3,500', '3500', '/public/uploads/Logo.png', '2'),
(6, 'Made Collagen มาเด้ คอลลาเจน 2,200', 'Made Collagen มาเด้ คอลลาเจน 2,200', '2200', '/public/uploads/Logo.png', '2'),
(7, 'Placenta Extract รกแกะ เมโส หน้าใส Switzerland  2,500', 'Placenta Extract รกแกะ เมโส หน้าใส Switzerland  2,500', '2500', '/public/uploads/Logo.png', '2'),
(8, 'Intravenous vitamin วิตามินผิว cocktail. 2,000', 'Intravenous vitamin วิตามินผิว cocktail. 2,000', '2000', '/public/uploads/Logo.png', '2'),
(9, 'Intravenous vitamin วิตามินผิว signature Aura 3,500', 'Intravenous vitamin วิตามินผิว signature Aura 3,500', '3500', '/public/uploads/Logo.png', '2'),
(10, 'Mesofat ลดไขมันแก้ม. 3,500', 'Mesofat ลดไขมันแก้ม. 3,500', '3500', '/public/uploads/Logo.png', '2'),
(11, 'Mesofat ลดเหนียง.  2,800', 'Mesofat ลดเหนียง.  2,800', '2800', '/public/uploads/Logo.png', '2'),
(12, 'Mesofat ลดไขมันแก้ม+เหนียง 5,500', 'Mesofat ลดไขมันแก้ม+เหนียง 5,500', '5500', '/public/uploads/Logo.png', '2'),
(13, 'Botox โบท็อกซ์ Upper face ลดริ้วรอยหางตา หน้าผาก คิ้ว 4,500', 'Botox โบท็อกซ์ Upper face ลดริ้วรอยหางตา หน้าผาก คิ้ว 4,500', '4500', '/public/uploads/Logo.png', '2'),
(14, 'Botox โบท็อกซ์ Super V-life technique หน้าวีเชฟ 6,000', 'Botox โบท็อกซ์ Super V-life technique หน้าวีเชฟ 6,000', '6000', '/public/uploads/Logo.png', '2'),
(15, 'Botox โบท็อกซ์ Masseter ลดกราม 4,000-5,500', 'Botox โบท็อกซ์ Masseter ลดกราม 4,000-5,500', '4000-5500', '/public/uploads/Logo.png', '2'),
(16, 'Botox โบท็อกซ์ 100 unit.  8,900-22,000', 'Botox โบท็อกซ์ 100 unit.  8,900-22,000', '8900-22000', '/public/uploads/Logo.png', '2'),
(17, 'Filler ฟิลเลอ เติมเต็ม ใต้ตา หน้าผาก แก้ม จมูก คาง ขมับ.  9,500-20,000', 'Filler ฟิลเลอ เติมเต็ม ใต้ตา หน้าผาก แก้ม จมูก คาง ขมับ.  9,500-20,000', '9500-20000', '/public/uploads/Logo.png', '2'),
(18, 'Thread life ร้อยไหม ก้างปลา collagen 8 D.  9,900-15,000', 'Thread life ร้อยไหม ก้างปลา collagen 8 D.  9,900-15,000 tets', '9900-15000', '/public/uploads/IMAGE-1578933638263.png', '2'),
(56, 'vitamin ผิว', 'ดริปวิตามินผิวใส + เมโสหน้าใส', '3500', '/public/uploads/IMAGE-1580173936858.JPG', '2'),
(64, 'เทสkrkrk', 'เทสrirkkrkr', '33993', '/public/uploads/IMAGE-1585016102041.png', '3');

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `id_reser` int(5) NOT NULL,
  `course` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `date` varchar(50) NOT NULL,
  `time` varchar(10) NOT NULL,
  `time_end` varchar(30) NOT NULL,
  `description` varchar(550) NOT NULL,
  `id_user` int(5) NOT NULL,
  `statusbooking` varchar(50) NOT NULL,
  `readed` enum('N','Y') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`id_reser`, `course`, `date`, `time`, `time_end`, `description`, `id_user`, `statusbooking`, `readed`) VALUES
(256, '2', '24-03-2563', '13.00', '15.00', '-', 11, 'อนุมัติ', 'N'),
(259, '10', '23-03-2563', '16.30', '18.30', '', 3, 'ไม่อนุมัติ', 'N'),
(260, '1', '23-03-2563', '13.00', '15.00', 'twst', 1, 'อนุมัติ', 'N'),
(261, '11', '24-03-2563', '15.00', '17.00', '-', 1, 'อนุมัติ', 'N'),
(262, '8', '25-03-2563', '14.30', '16.30', '-', 1, 'อนุมัติ', 'N'),
(263, '10', '26-03-2563', '14.00', '16.00', '-', 1, 'อนุมัติ', 'N'),
(264, '8', '03-03-2563', '16.00', '18.00', '--', 3, 'รอดำเนินการ', 'N'),
(265, '4', '06-03-2563', '15.00', '17.00', 'test', 3, 'ไม่อนุมัติ', 'N'),
(266, '15', '11-03-2563', '13.30', '15.30', '-', 3, 'อนุมัติ', 'N'),
(267, '4', '23-03-2563', '18.30', '20.30', '--', 10, 'ไม่อนุมัติ', 'N'),
(268, '13', '19-03-2563', '13.00', '15.00', '---', 10, 'ไม่อนุมัติ', 'N'),
(273, '4', '24-03-2563', '17.00', '19.00', 'เทส', 12, 'อนุมัติ', 'N'),
(274, '4', '30-03-2564', '12.30', '14.30', 'tets', 1, 'ไม่อนุมัติ', 'N');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'nattikan@hotmail.com', '$2a$10$h1CE5jcg8Xps3GxufbSs1eaLNxqFS03qrt6ah6Z2w7.PcWttYgCEC'),
(2, 'a@hotmail.com', '$2a$08$8P69FAwN2jsP9ZOc7PWfWOIu3ZWDdUmp89y2978./NDp/N8/OB8v6'),
(3, 'baitong@hotmail.com', '$2a$08$FdxKEp9l9U2L9LkTTa6TMOEsjLy9jGnJrgKTmYmmkPOJT42CbHFq6'),
(7, 'admin', '$2a$08$j5vLjm9EYRgwGH9dR91OYOIRndWVagewp9kdKP7NTVe00eNIglPcC'),
(10, 'fear@hotmail.com', '$2a$08$EbERBTZQq2jT6hUMNKcBSOraT5XXAaEWJbU5qVfV5OEY3Nrwe9Ocu'),
(11, 'daw@mail.com', '$2a$08$5gq26Ygaoxs8RNNJjwEFr.m2SZlfzEhJJdbDp0xrW3VRe/xMagjye'),
(12, 'best@hotmail.com', '$2a$08$tKrj2zRVbeVHgdlYUJIS3Or5F5FepSjYsmCEAcX0oxeiIqgP2NN/6');

-- --------------------------------------------------------

--
-- Table structure for table `user_detail`
--

CREATE TABLE `user_detail` (
  `id_user` int(5) NOT NULL,
  `firstname` varchar(300) NOT NULL,
  `lastname` varchar(300) NOT NULL,
  `sex` varchar(20) NOT NULL,
  `tel` varchar(20) NOT NULL,
  `address` varchar(500) NOT NULL,
  `status` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_detail`
--

INSERT INTO `user_detail` (`id_user`, `firstname`, `lastname`, `sex`, `tel`, `address`, `status`) VALUES
(1, 'ณัฐติกานต์ ', 'ขันชัยภูมิ', 'หญิง', '0961234321', '123 ชัยภูมิ', 'user'),
(2, 'พี่เพียว', '-', 'Male', '085-5950000', 'คลินิกหมอเพื่อน', 'admin'),
(3, 'baitong', 'tong', 'Female', '48484884844', 'cs', 'user'),
(4, 'nattikan', 'kanchaiyaphum', 'Female', '0874600011', '919 pirom', 'user'),
(10, 'กุลธรา', 'บุญทวี', 'Female', '0874600011', 'cs kku', 'user'),
(11, 'ณัฐติยา', 'ขันชัยภูมิ', 'Female', '0624280011', 'law kku', 'user'),
(12, 'ภาฯุพงศ์', 'ทองศรี', 'Male', '0874600011', 'cskku', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`idchat`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`idcontact`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`idcourse`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id_reser`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_detail`
--
ALTER TABLE `user_detail`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `idchat` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `idcontact` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `idcourse` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id_reser` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=275;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_detail`
--
ALTER TABLE `user_detail`
  MODIFY `id_user` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
