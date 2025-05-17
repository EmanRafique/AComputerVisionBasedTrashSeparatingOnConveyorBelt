-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2025 at 05:32 PM
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
-- Database: `cleanydatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `barcode`
--

CREATE TABLE `barcode` (
  `Id` int(11) NOT NULL,
  `barcode` varchar(50) NOT NULL,
  `stripid` int(11) NOT NULL,
  `isvalid` enum('valid','invalid') NOT NULL DEFAULT 'valid',
  `type` enum('recyclable','nonrecyclable') NOT NULL,
  `imagepath` varchar(255) NOT NULL,
  `scanned_at` datetime DEFAULT NULL,
  `Is_Scannable` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barcode`
--

INSERT INTO `barcode` (`Id`, `barcode`, `stripid`, `isvalid`, `type`, `imagepath`, `scanned_at`, `Is_Scannable`) VALUES
(5084, '5084-138-525-18-recyclable', 525, 'valid', 'recyclable', 'static\\barcodes\\barcode_525_0.png', NULL, 0),
(5085, '5085-138-525-18-recyclable', 525, 'invalid', 'recyclable', 'static\\barcodes\\barcode_525_1.png', '2025-05-17 16:59:50', 1),
(5086, '5086-138-525-18-recyclable', 525, 'valid', 'recyclable', 'static\\barcodes\\barcode_525_2.png', NULL, 0),
(5087, '5087-138-525-18-recyclable', 525, 'valid', 'recyclable', 'static\\barcodes\\barcode_525_3.png', NULL, 0),
(5088, '5088-138-525-18-recyclable', 525, 'valid', 'recyclable', 'static\\barcodes\\barcode_525_4.png', NULL, 0),
(5089, '5089-138-525-18-recyclable', 525, 'invalid', 'recyclable', 'static\\barcodes\\barcode_525_5.png', '2025-04-26 14:31:37', 1),
(5090, '5090-138-525-18-recyclable', 525, 'valid', 'recyclable', 'static\\barcodes\\barcode_525_6.png', NULL, 0),
(5091, '5091-138-525-18-recyclable', 525, 'valid', 'recyclable', 'static\\barcodes\\barcode_525_7.png', NULL, 0),
(5092, '5092-138-525-18-recyclable', 525, 'valid', 'recyclable', 'static\\barcodes\\barcode_525_8.png', NULL, 0),
(5093, '5093-138-525-18-recyclable', 525, 'invalid', 'recyclable', 'static\\barcodes\\barcode_525_9.png', '2025-04-26 14:31:48', 1),
(5094, '5094-138-526-18-recyclable', 526, 'invalid', 'recyclable', 'static\\barcodes\\barcode_526_0.png', '2025-04-17 17:24:55', 1),
(5095, '5095-138-526-18-recyclable', 526, 'valid', 'recyclable', 'static\\barcodes\\barcode_526_1.png', NULL, 0),
(5096, '5096-138-526-18-recyclable', 526, 'valid', 'recyclable', 'static\\barcodes\\barcode_526_2.png', NULL, 0),
(5097, '5097-138-526-18-recyclable', 526, 'valid', 'recyclable', 'static\\barcodes\\barcode_526_3.png', NULL, 0),
(5098, '5098-138-526-18-recyclable', 526, 'valid', 'recyclable', 'static\\barcodes\\barcode_526_4.png', NULL, 0),
(5099, '5099-138-526-18-recyclable', 526, 'valid', 'recyclable', 'static\\barcodes\\barcode_526_5.png', NULL, 0),
(5100, '5100-138-526-18-recyclable', 526, 'valid', 'recyclable', 'static\\barcodes\\barcode_526_6.png', NULL, 0),
(5101, '5101-138-526-18-recyclable', 526, 'valid', 'recyclable', 'static\\barcodes\\barcode_526_7.png', NULL, 0),
(5102, '5102-138-526-18-recyclable', 526, 'valid', 'recyclable', 'static\\barcodes\\barcode_526_8.png', NULL, 0),
(5103, '5103-138-526-18-recyclable', 526, 'valid', 'recyclable', 'static\\barcodes\\barcode_526_9.png', NULL, 0),
(5104, '5104-138-527-18-recyclable', 527, 'valid', 'recyclable', 'static\\barcodes\\barcode_527_0.png', NULL, 0),
(5105, '5105-138-527-18-recyclable', 527, 'valid', 'recyclable', 'static\\barcodes\\barcode_527_1.png', NULL, 0),
(5106, '5106-138-527-18-recyclable', 527, 'valid', 'recyclable', 'static\\barcodes\\barcode_527_2.png', NULL, 0),
(5107, '5107-138-527-18-recyclable', 527, 'valid', 'recyclable', 'static\\barcodes\\barcode_527_3.png', NULL, 0),
(5108, '5108-138-527-18-recyclable', 527, 'valid', 'recyclable', 'static\\barcodes\\barcode_527_4.png', NULL, 0),
(5109, '5109-138-527-18-recyclable', 527, 'valid', 'recyclable', 'static\\barcodes\\barcode_527_5.png', NULL, 0),
(5110, '5110-138-527-18-recyclable', 527, 'valid', 'recyclable', 'static\\barcodes\\barcode_527_6.png', NULL, 0),
(5111, '5111-138-527-18-recyclable', 527, 'valid', 'recyclable', 'static\\barcodes\\barcode_527_7.png', NULL, 0),
(5112, '5112-138-527-18-recyclable', 527, 'valid', 'recyclable', 'static\\barcodes\\barcode_527_8.png', NULL, 0),
(5113, '5113-138-527-18-recyclable', 527, 'valid', 'recyclable', 'static\\barcodes\\barcode_527_9.png', NULL, 0),
(5114, '5114-138-528-18-recyclable', 528, 'valid', 'recyclable', 'static\\barcodes\\barcode_528_0.png', NULL, 0),
(5115, '5115-138-528-18-recyclable', 528, 'valid', 'recyclable', 'static\\barcodes\\barcode_528_1.png', NULL, 0),
(5116, '5116-138-528-18-recyclable', 528, 'valid', 'recyclable', 'static\\barcodes\\barcode_528_2.png', NULL, 0),
(5117, '5117-138-528-18-recyclable', 528, 'valid', 'recyclable', 'static\\barcodes\\barcode_528_3.png', NULL, 0),
(5118, '5118-138-528-18-recyclable', 528, 'valid', 'recyclable', 'static\\barcodes\\barcode_528_4.png', NULL, 0),
(5119, '5119-138-528-18-recyclable', 528, 'valid', 'recyclable', 'static\\barcodes\\barcode_528_5.png', NULL, 0),
(5120, '5120-138-528-18-recyclable', 528, 'valid', 'recyclable', 'static\\barcodes\\barcode_528_6.png', NULL, 0),
(5121, '5121-138-528-18-recyclable', 528, 'valid', 'recyclable', 'static\\barcodes\\barcode_528_7.png', NULL, 0),
(5122, '5122-138-528-18-recyclable', 528, 'valid', 'recyclable', 'static\\barcodes\\barcode_528_8.png', NULL, 0),
(5123, '5123-138-528-18-recyclable', 528, 'valid', 'recyclable', 'static\\barcodes\\barcode_528_9.png', NULL, 0),
(5124, '5124-138-529-18-recyclable', 529, 'valid', 'recyclable', 'static\\barcodes\\barcode_529_0.png', NULL, 0),
(5125, '5125-138-529-18-recyclable', 529, 'valid', 'recyclable', 'static\\barcodes\\barcode_529_1.png', NULL, 0),
(5126, '5126-138-529-18-recyclable', 529, 'valid', 'recyclable', 'static\\barcodes\\barcode_529_2.png', NULL, 0),
(5127, '5127-138-529-18-recyclable', 529, 'valid', 'recyclable', 'static\\barcodes\\barcode_529_3.png', NULL, 0),
(5128, '5128-138-529-18-recyclable', 529, 'valid', 'recyclable', 'static\\barcodes\\barcode_529_4.png', NULL, 0),
(5129, '5129-138-529-18-recyclable', 529, 'valid', 'recyclable', 'static\\barcodes\\barcode_529_5.png', NULL, 0),
(5130, '5130-138-529-18-recyclable', 529, 'valid', 'recyclable', 'static\\barcodes\\barcode_529_6.png', NULL, 0),
(5131, '5131-138-529-18-recyclable', 529, 'valid', 'recyclable', 'static\\barcodes\\barcode_529_7.png', NULL, 0),
(5132, '5132-138-529-18-recyclable', 529, 'valid', 'recyclable', 'static\\barcodes\\barcode_529_8.png', NULL, 0),
(5133, '5133-138-529-18-recyclable', 529, 'valid', 'recyclable', 'static\\barcodes\\barcode_529_9.png', NULL, 0),
(5134, '5134-138-530-18-recyclable', 530, 'valid', 'recyclable', 'static\\barcodes\\barcode_530_0.png', NULL, 0),
(5135, '5135-138-530-18-recyclable', 530, 'valid', 'recyclable', 'static\\barcodes\\barcode_530_1.png', NULL, 0),
(5136, '5136-138-530-18-recyclable', 530, 'valid', 'recyclable', 'static\\barcodes\\barcode_530_2.png', NULL, 0),
(5137, '5137-138-530-18-recyclable', 530, 'valid', 'recyclable', 'static\\barcodes\\barcode_530_3.png', NULL, 0),
(5138, '5138-138-530-18-recyclable', 530, 'valid', 'recyclable', 'static\\barcodes\\barcode_530_4.png', NULL, 0),
(5139, '5139-138-530-18-recyclable', 530, 'valid', 'recyclable', 'static\\barcodes\\barcode_530_5.png', NULL, 0),
(5140, '5140-138-530-18-recyclable', 530, 'valid', 'recyclable', 'static\\barcodes\\barcode_530_6.png', NULL, 0),
(5141, '5141-138-530-18-recyclable', 530, 'valid', 'recyclable', 'static\\barcodes\\barcode_530_7.png', NULL, 0),
(5142, '5142-138-530-18-recyclable', 530, 'valid', 'recyclable', 'static\\barcodes\\barcode_530_8.png', NULL, 0),
(5143, '5143-138-530-18-recyclable', 530, 'valid', 'recyclable', 'static\\barcodes\\barcode_530_9.png', NULL, 0),
(5144, '5144-138-531-18-recyclable', 531, 'valid', 'recyclable', 'static\\barcodes\\barcode_531_0.png', NULL, 0),
(5145, '5145-138-531-18-recyclable', 531, 'valid', 'recyclable', 'static\\barcodes\\barcode_531_1.png', NULL, 0),
(5146, '5146-138-531-18-recyclable', 531, 'valid', 'recyclable', 'static\\barcodes\\barcode_531_2.png', NULL, 0),
(5147, '5147-138-531-18-recyclable', 531, 'valid', 'recyclable', 'static\\barcodes\\barcode_531_3.png', NULL, 0),
(5148, '5148-138-531-18-recyclable', 531, 'valid', 'recyclable', 'static\\barcodes\\barcode_531_4.png', NULL, 0),
(5149, '5149-138-531-18-recyclable', 531, 'valid', 'recyclable', 'static\\barcodes\\barcode_531_5.png', NULL, 0),
(5150, '5150-138-531-18-recyclable', 531, 'valid', 'recyclable', 'static\\barcodes\\barcode_531_6.png', NULL, 0),
(5151, '5151-138-531-18-recyclable', 531, 'valid', 'recyclable', 'static\\barcodes\\barcode_531_7.png', NULL, 0),
(5152, '5152-138-531-18-recyclable', 531, 'valid', 'recyclable', 'static\\barcodes\\barcode_531_8.png', NULL, 0),
(5153, '5153-138-531-18-recyclable', 531, 'valid', 'recyclable', 'static\\barcodes\\barcode_531_9.png', NULL, 0),
(5154, '5154-138-532-18-recyclable', 532, 'valid', 'recyclable', 'static\\barcodes\\barcode_532_0.png', NULL, 0),
(5155, '5155-138-532-18-recyclable', 532, 'valid', 'recyclable', 'static\\barcodes\\barcode_532_1.png', NULL, 0),
(5156, '5156-138-532-18-recyclable', 532, 'valid', 'recyclable', 'static\\barcodes\\barcode_532_2.png', NULL, 0),
(5157, '5157-138-532-18-recyclable', 532, 'valid', 'recyclable', 'static\\barcodes\\barcode_532_3.png', NULL, 0),
(5158, '5158-138-532-18-recyclable', 532, 'valid', 'recyclable', 'static\\barcodes\\barcode_532_4.png', NULL, 0),
(5159, '5159-138-532-18-recyclable', 532, 'valid', 'recyclable', 'static\\barcodes\\barcode_532_5.png', NULL, 0),
(5160, '5160-138-532-18-recyclable', 532, 'valid', 'recyclable', 'static\\barcodes\\barcode_532_6.png', NULL, 0),
(5161, '5161-138-532-18-recyclable', 532, 'valid', 'recyclable', 'static\\barcodes\\barcode_532_7.png', NULL, 0),
(5162, '5162-138-532-18-recyclable', 532, 'valid', 'recyclable', 'static\\barcodes\\barcode_532_8.png', NULL, 0),
(5163, '5163-138-532-18-recyclable', 532, 'valid', 'recyclable', 'static\\barcodes\\barcode_532_9.png', NULL, 0),
(5164, '5164-138-533-18-recyclable', 533, 'valid', 'recyclable', 'static\\barcodes\\barcode_533_0.png', NULL, 0),
(5165, '5165-138-533-18-recyclable', 533, 'valid', 'recyclable', 'static\\barcodes\\barcode_533_1.png', NULL, 0),
(5166, '5166-138-533-18-recyclable', 533, 'valid', 'recyclable', 'static\\barcodes\\barcode_533_2.png', NULL, 0),
(5167, '5167-138-533-18-recyclable', 533, 'valid', 'recyclable', 'static\\barcodes\\barcode_533_3.png', NULL, 0),
(5168, '5168-138-533-18-recyclable', 533, 'valid', 'recyclable', 'static\\barcodes\\barcode_533_4.png', NULL, 0),
(5169, '5169-138-533-18-recyclable', 533, 'valid', 'recyclable', 'static\\barcodes\\barcode_533_5.png', NULL, 0),
(5170, '5170-138-533-18-recyclable', 533, 'valid', 'recyclable', 'static\\barcodes\\barcode_533_6.png', NULL, 0),
(5171, '5171-138-533-18-recyclable', 533, 'valid', 'recyclable', 'static\\barcodes\\barcode_533_7.png', NULL, 0),
(5172, '5172-138-533-18-recyclable', 533, 'valid', 'recyclable', 'static\\barcodes\\barcode_533_8.png', NULL, 0),
(5173, '5173-138-533-18-recyclable', 533, 'valid', 'recyclable', 'static\\barcodes\\barcode_533_9.png', NULL, 0),
(5174, '5174-138-534-18-recyclable', 534, 'valid', 'recyclable', 'static\\barcodes\\barcode_534_0.png', NULL, 0),
(5175, '5175-138-534-18-recyclable', 534, 'valid', 'recyclable', 'static\\barcodes\\barcode_534_1.png', NULL, 0),
(5176, '5176-138-534-18-recyclable', 534, 'valid', 'recyclable', 'static\\barcodes\\barcode_534_2.png', NULL, 0),
(5177, '5177-138-534-18-recyclable', 534, 'valid', 'recyclable', 'static\\barcodes\\barcode_534_3.png', NULL, 0),
(5178, '5178-138-534-18-recyclable', 534, 'valid', 'recyclable', 'static\\barcodes\\barcode_534_4.png', NULL, 0),
(5179, '5179-138-534-18-recyclable', 534, 'valid', 'recyclable', 'static\\barcodes\\barcode_534_5.png', NULL, 0),
(5180, '5180-138-534-18-recyclable', 534, 'valid', 'recyclable', 'static\\barcodes\\barcode_534_6.png', NULL, 0),
(5181, '5181-138-534-18-recyclable', 534, 'valid', 'recyclable', 'static\\barcodes\\barcode_534_7.png', NULL, 0),
(5182, '5182-138-534-18-recyclable', 534, 'valid', 'recyclable', 'static\\barcodes\\barcode_534_8.png', NULL, 0),
(5183, '5183-138-534-18-recyclable', 534, 'valid', 'recyclable', 'static\\barcodes\\barcode_534_9.png', NULL, 0),
(5184, '5184-138-535-18-recyclable', 535, 'valid', 'recyclable', 'static\\barcodes\\barcode_535_0.png', NULL, 0),
(5185, '5185-138-535-18-recyclable', 535, 'valid', 'recyclable', 'static\\barcodes\\barcode_535_1.png', NULL, 0),
(5186, '5186-138-535-18-recyclable', 535, 'valid', 'recyclable', 'static\\barcodes\\barcode_535_2.png', NULL, 0),
(5187, '5187-138-535-18-recyclable', 535, 'valid', 'recyclable', 'static\\barcodes\\barcode_535_3.png', NULL, 0),
(5188, '5188-138-535-18-recyclable', 535, 'valid', 'recyclable', 'static\\barcodes\\barcode_535_4.png', NULL, 0),
(5189, '5189-138-535-18-recyclable', 535, 'valid', 'recyclable', 'static\\barcodes\\barcode_535_5.png', NULL, 0),
(5190, '5190-138-535-18-recyclable', 535, 'valid', 'recyclable', 'static\\barcodes\\barcode_535_6.png', NULL, 0),
(5191, '5191-138-535-18-recyclable', 535, 'invalid', 'recyclable', 'static\\barcodes\\barcode_535_7.png', '2025-05-17 17:03:20', 1),
(5192, '5192-138-535-18-recyclable', 535, 'valid', 'recyclable', 'static\\barcodes\\barcode_535_8.png', NULL, 0),
(5193, '5193-138-535-18-recyclable', 535, 'valid', 'recyclable', 'static\\barcodes\\barcode_535_9.png', NULL, 0),
(5194, '5194-138-536-19-recyclable', 536, 'valid', 'recyclable', 'static\\barcodes\\barcode_536_0.png', NULL, 0),
(5195, '5195-138-536-19-recyclable', 536, 'valid', 'recyclable', 'static\\barcodes\\barcode_536_1.png', NULL, 0),
(5196, '5196-138-536-19-recyclable', 536, 'valid', 'recyclable', 'static\\barcodes\\barcode_536_2.png', NULL, 0),
(5197, '5197-138-536-19-recyclable', 536, 'valid', 'recyclable', 'static\\barcodes\\barcode_536_3.png', NULL, 0),
(5198, '5198-138-536-19-recyclable', 536, 'invalid', 'recyclable', 'static\\barcodes\\barcode_536_4.png', '2025-04-17 17:57:02', 1),
(5199, '5199-138-536-19-recyclable', 536, 'invalid', 'recyclable', 'static\\barcodes\\barcode_536_5.png', '2025-04-17 17:37:30', 1),
(5200, '5200-138-536-19-recyclable', 536, 'valid', 'recyclable', 'static\\barcodes\\barcode_536_6.png', NULL, 0),
(5201, '5201-138-536-19-recyclable', 536, 'valid', 'recyclable', 'static\\barcodes\\barcode_536_7.png', NULL, 0),
(5202, '5202-138-536-19-recyclable', 536, 'valid', 'recyclable', 'static\\barcodes\\barcode_536_8.png', NULL, 0),
(5203, '5203-138-536-19-recyclable', 536, 'valid', 'recyclable', 'static\\barcodes\\barcode_536_9.png', NULL, 0),
(5204, '5204-138-537-18-recyclable', 537, 'valid', 'recyclable', 'static\\barcodes\\barcode_537_0.png', NULL, 0),
(5205, '5205-138-537-18-recyclable', 537, 'valid', 'recyclable', 'static\\barcodes\\barcode_537_1.png', NULL, 0),
(5206, '5206-138-537-18-recyclable', 537, 'valid', 'recyclable', 'static\\barcodes\\barcode_537_2.png', NULL, 0),
(5207, '5207-138-537-18-recyclable', 537, 'valid', 'recyclable', 'static\\barcodes\\barcode_537_3.png', NULL, 0),
(5208, '5208-138-537-18-recyclable', 537, 'invalid', 'recyclable', 'static\\barcodes\\barcode_537_4.png', '2025-04-17 17:25:44', 1),
(5209, '5209-138-537-18-recyclable', 537, 'valid', 'recyclable', 'static\\barcodes\\barcode_537_5.png', NULL, 0),
(5210, '5210-138-537-18-recyclable', 537, 'valid', 'recyclable', 'static\\barcodes\\barcode_537_6.png', NULL, 0),
(5211, '5211-138-537-18-recyclable', 537, 'valid', 'recyclable', 'static\\barcodes\\barcode_537_7.png', NULL, 0),
(5212, '5212-138-537-18-recyclable', 537, 'valid', 'recyclable', 'static\\barcodes\\barcode_537_8.png', NULL, 0),
(5213, '5213-138-537-18-recyclable', 537, 'invalid', 'recyclable', 'static\\barcodes\\barcode_537_9.png', '2025-04-16 13:12:29', 1),
(5214, '5214-130-538-19-recyclable', 538, 'valid', 'recyclable', 'static\\barcodes\\barcode_538_0.png', NULL, 0),
(5215, '5215-130-538-19-recyclable', 538, 'valid', 'recyclable', 'static\\barcodes\\barcode_538_1.png', NULL, 0),
(5216, '5216-130-538-19-recyclable', 538, 'valid', 'recyclable', 'static\\barcodes\\barcode_538_2.png', NULL, 0),
(5217, '5217-130-538-19-recyclable', 538, 'valid', 'recyclable', 'static\\barcodes\\barcode_538_3.png', NULL, 0),
(5218, '5218-130-538-19-recyclable', 538, 'valid', 'recyclable', 'static\\barcodes\\barcode_538_4.png', NULL, 0),
(5219, '5219-130-538-19-recyclable', 538, 'valid', 'recyclable', 'static\\barcodes\\barcode_538_5.png', NULL, 0),
(5220, '5220-130-538-19-recyclable', 538, 'valid', 'recyclable', 'static\\barcodes\\barcode_538_6.png', NULL, 0),
(5221, '5221-130-538-19-recyclable', 538, 'valid', 'recyclable', 'static\\barcodes\\barcode_538_7.png', NULL, 0),
(5222, '5222-130-538-19-recyclable', 538, 'valid', 'recyclable', 'static\\barcodes\\barcode_538_8.png', NULL, 0),
(5223, '5223-130-538-19-recyclable', 538, 'valid', 'recyclable', 'static\\barcodes\\barcode_538_9.png', NULL, 0),
(5224, '5224-127-539-20-recyclable', 539, 'valid', 'recyclable', 'static\\barcodes\\barcode_539_0.png', NULL, 0),
(5225, '5225-127-539-20-recyclable', 539, 'valid', 'recyclable', 'static\\barcodes\\barcode_539_1.png', NULL, 0),
(5226, '5226-127-539-20-recyclable', 539, 'valid', 'recyclable', 'static\\barcodes\\barcode_539_2.png', NULL, 0),
(5227, '5227-127-539-20-recyclable', 539, 'valid', 'recyclable', 'static\\barcodes\\barcode_539_3.png', NULL, 0),
(5228, '5228-127-539-20-recyclable', 539, 'valid', 'recyclable', 'static\\barcodes\\barcode_539_4.png', NULL, 0),
(5229, '5229-127-539-20-recyclable', 539, 'valid', 'recyclable', 'static\\barcodes\\barcode_539_5.png', NULL, 0),
(5230, '5230-127-539-20-recyclable', 539, 'valid', 'recyclable', 'static\\barcodes\\barcode_539_6.png', NULL, 0),
(5231, '5231-127-539-20-recyclable', 539, 'valid', 'recyclable', 'static\\barcodes\\barcode_539_7.png', NULL, 0),
(5232, '5232-127-539-20-recyclable', 539, 'valid', 'recyclable', 'static\\barcodes\\barcode_539_8.png', NULL, 0),
(5233, '5233-127-539-20-recyclable', 539, 'valid', 'recyclable', 'static\\barcodes\\barcode_539_9.png', NULL, 0),
(5234, '5234-127-540-20-nonrecyclable', 540, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_540_0.png', NULL, 0),
(5235, '5235-127-540-20-nonrecyclable', 540, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_540_1.png', NULL, 0),
(5236, '5236-127-540-20-nonrecyclable', 540, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_540_2.png', NULL, 0),
(5237, '5237-127-540-20-nonrecyclable', 540, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_540_3.png', NULL, 0),
(5238, '5238-127-540-20-nonrecyclable', 540, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_540_4.png', NULL, 0),
(5239, '5239-127-540-20-nonrecyclable', 540, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_540_5.png', NULL, 0),
(5240, '5240-127-540-20-nonrecyclable', 540, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_540_6.png', NULL, 0),
(5241, '5241-127-540-20-nonrecyclable', 540, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_540_7.png', NULL, 0),
(5242, '5242-127-540-20-nonrecyclable', 540, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_540_8.png', NULL, 0),
(5243, '5243-127-540-20-nonrecyclable', 540, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_540_9.png', NULL, 0),
(5244, '5244-127-541-20-nonrecyclable', 541, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_541_0.png', NULL, 0),
(5245, '5245-127-541-20-nonrecyclable', 541, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_541_1.png', NULL, 0),
(5246, '5246-127-541-20-nonrecyclable', 541, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_541_2.png', NULL, 0),
(5247, '5247-127-541-20-nonrecyclable', 541, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_541_3.png', NULL, 0),
(5248, '5248-127-541-20-nonrecyclable', 541, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_541_4.png', NULL, 0),
(5249, '5249-127-541-20-nonrecyclable', 541, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_541_5.png', NULL, 0),
(5250, '5250-127-541-20-nonrecyclable', 541, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_541_6.png', NULL, 0),
(5251, '5251-127-541-20-nonrecyclable', 541, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_541_7.png', NULL, 0),
(5252, '5252-127-541-20-nonrecyclable', 541, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_541_8.png', NULL, 0),
(5253, '5253-127-541-20-nonrecyclable', 541, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_541_9.png', NULL, 0),
(5254, '5254-127-542-20-recyclable', 542, 'valid', 'recyclable', 'static\\barcodes\\barcode_542_0.png', NULL, 0),
(5255, '5255-127-542-20-recyclable', 542, 'valid', 'recyclable', 'static\\barcodes\\barcode_542_1.png', NULL, 0),
(5256, '5256-127-542-20-recyclable', 542, 'invalid', 'recyclable', 'static\\barcodes\\barcode_542_2.png', '2025-05-06 16:06:43', 1),
(5257, '5257-127-542-20-recyclable', 542, 'valid', 'recyclable', 'static\\barcodes\\barcode_542_3.png', NULL, 0),
(5258, '5258-127-542-20-recyclable', 542, 'invalid', 'recyclable', 'static\\barcodes\\barcode_542_4.png', '2025-05-06 16:07:47', 1),
(5259, '5259-127-542-20-recyclable', 542, 'valid', 'recyclable', 'static\\barcodes\\barcode_542_5.png', NULL, 0),
(5260, '5260-127-542-20-recyclable', 542, 'valid', 'recyclable', 'static\\barcodes\\barcode_542_6.png', NULL, 0),
(5261, '5261-127-542-20-recyclable', 542, 'valid', 'recyclable', 'static\\barcodes\\barcode_542_7.png', NULL, 0),
(5262, '5262-127-542-20-recyclable', 542, 'valid', 'recyclable', 'static\\barcodes\\barcode_542_8.png', NULL, 0),
(5263, '5263-127-542-20-recyclable', 542, 'valid', 'recyclable', 'static\\barcodes\\barcode_542_9.png', NULL, 0),
(5264, '5264-127-543-18-recyclable', 543, 'valid', 'recyclable', 'static\\barcodes\\barcode_543_0.png', NULL, 0),
(5265, '5265-127-543-18-recyclable', 543, 'valid', 'recyclable', 'static\\barcodes\\barcode_543_1.png', NULL, 0),
(5266, '5266-127-543-18-recyclable', 543, 'valid', 'recyclable', 'static\\barcodes\\barcode_543_2.png', NULL, 0),
(5267, '5267-127-543-18-recyclable', 543, 'valid', 'recyclable', 'static\\barcodes\\barcode_543_3.png', NULL, 0),
(5268, '5268-127-543-18-recyclable', 543, 'valid', 'recyclable', 'static\\barcodes\\barcode_543_4.png', NULL, 0),
(5269, '5269-127-543-18-recyclable', 543, 'valid', 'recyclable', 'static\\barcodes\\barcode_543_5.png', NULL, 0),
(5270, '5270-127-543-18-recyclable', 543, 'valid', 'recyclable', 'static\\barcodes\\barcode_543_6.png', NULL, 0),
(5271, '5271-127-543-18-recyclable', 543, 'valid', 'recyclable', 'static\\barcodes\\barcode_543_7.png', NULL, 0),
(5272, '5272-127-543-18-recyclable', 543, 'valid', 'recyclable', 'static\\barcodes\\barcode_543_8.png', NULL, 0),
(5273, '5273-127-543-18-recyclable', 543, 'valid', 'recyclable', 'static\\barcodes\\barcode_543_9.png', NULL, 0),
(5274, '5274-127-544-18-recyclable', 544, 'valid', 'recyclable', 'static\\barcodes\\barcode_544_0.png', NULL, 0),
(5275, '5275-127-544-18-recyclable', 544, 'valid', 'recyclable', 'static\\barcodes\\barcode_544_1.png', NULL, 0),
(5276, '5276-127-544-18-recyclable', 544, 'valid', 'recyclable', 'static\\barcodes\\barcode_544_2.png', NULL, 0),
(5277, '5277-127-544-18-recyclable', 544, 'valid', 'recyclable', 'static\\barcodes\\barcode_544_3.png', NULL, 0),
(5278, '5278-127-544-18-recyclable', 544, 'valid', 'recyclable', 'static\\barcodes\\barcode_544_4.png', NULL, 0),
(5279, '5279-127-544-18-recyclable', 544, 'valid', 'recyclable', 'static\\barcodes\\barcode_544_5.png', NULL, 0),
(5280, '5280-127-544-18-recyclable', 544, 'valid', 'recyclable', 'static\\barcodes\\barcode_544_6.png', NULL, 0),
(5281, '5281-127-544-18-recyclable', 544, 'valid', 'recyclable', 'static\\barcodes\\barcode_544_7.png', NULL, 0),
(5282, '5282-127-544-18-recyclable', 544, 'valid', 'recyclable', 'static\\barcodes\\barcode_544_8.png', NULL, 0),
(5283, '5283-127-544-18-recyclable', 544, 'valid', 'recyclable', 'static\\barcodes\\barcode_544_9.png', NULL, 0),
(5284, '5284-127-545-20-recyclable', 545, 'valid', 'recyclable', 'static\\barcodes\\barcode_545_0.png', NULL, 0),
(5285, '5285-127-545-20-recyclable', 545, 'valid', 'recyclable', 'static\\barcodes\\barcode_545_1.png', NULL, 0),
(5286, '5286-127-545-20-recyclable', 545, 'valid', 'recyclable', 'static\\barcodes\\barcode_545_2.png', NULL, 0),
(5287, '5287-127-545-20-recyclable', 545, 'valid', 'recyclable', 'static\\barcodes\\barcode_545_3.png', NULL, 0),
(5288, '5288-127-545-20-recyclable', 545, 'valid', 'recyclable', 'static\\barcodes\\barcode_545_4.png', NULL, 0),
(5289, '5289-127-545-20-recyclable', 545, 'valid', 'recyclable', 'static\\barcodes\\barcode_545_5.png', NULL, 0),
(5290, '5290-127-545-20-recyclable', 545, 'valid', 'recyclable', 'static\\barcodes\\barcode_545_6.png', NULL, 0),
(5291, '5291-127-545-20-recyclable', 545, 'valid', 'recyclable', 'static\\barcodes\\barcode_545_7.png', NULL, 0),
(5292, '5292-127-545-20-recyclable', 545, 'valid', 'recyclable', 'static\\barcodes\\barcode_545_8.png', NULL, 0),
(5293, '5293-127-545-20-recyclable', 545, 'valid', 'recyclable', 'static\\barcodes\\barcode_545_9.png', NULL, 0),
(5294, '5294-139-546-19-recyclable', 546, 'valid', 'recyclable', 'static\\barcodes\\barcode_546_0.png', NULL, 0),
(5295, '5295-139-546-19-recyclable', 546, 'valid', 'recyclable', 'static\\barcodes\\barcode_546_1.png', NULL, 0),
(5296, '5296-139-546-19-recyclable', 546, 'valid', 'recyclable', 'static\\barcodes\\barcode_546_2.png', NULL, 0),
(5297, '5297-139-546-19-recyclable', 546, 'valid', 'recyclable', 'static\\barcodes\\barcode_546_3.png', NULL, 0),
(5298, '5298-139-546-19-recyclable', 546, 'valid', 'recyclable', 'static\\barcodes\\barcode_546_4.png', NULL, 0),
(5299, '5299-139-546-19-recyclable', 546, 'valid', 'recyclable', 'static\\barcodes\\barcode_546_5.png', NULL, 0),
(5300, '5300-139-546-19-recyclable', 546, 'valid', 'recyclable', 'static\\barcodes\\barcode_546_6.png', NULL, 0),
(5301, '5301-139-546-19-recyclable', 546, 'valid', 'recyclable', 'static\\barcodes\\barcode_546_7.png', NULL, 0),
(5302, '5302-139-546-19-recyclable', 546, 'valid', 'recyclable', 'static\\barcodes\\barcode_546_8.png', NULL, 0),
(5303, '5303-139-546-19-recyclable', 546, 'valid', 'recyclable', 'static\\barcodes\\barcode_546_9.png', NULL, 0),
(5304, '5304-139-547-19-nonrecyclable', 547, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_547_0.png', NULL, 0),
(5305, '5305-139-547-19-nonrecyclable', 547, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_547_1.png', NULL, 0),
(5306, '5306-139-547-19-nonrecyclable', 547, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_547_2.png', NULL, 0),
(5307, '5307-139-547-19-nonrecyclable', 547, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_547_3.png', NULL, 0),
(5308, '5308-139-547-19-nonrecyclable', 547, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_547_4.png', NULL, 0),
(5309, '5309-139-547-19-nonrecyclable', 547, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_547_5.png', NULL, 0),
(5310, '5310-139-547-19-nonrecyclable', 547, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_547_6.png', NULL, 0),
(5311, '5311-139-547-19-nonrecyclable', 547, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_547_7.png', NULL, 0),
(5312, '5312-139-547-19-nonrecyclable', 547, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_547_8.png', NULL, 0),
(5313, '5313-139-547-19-nonrecyclable', 547, 'valid', 'nonrecyclable', 'static\\barcodes\\barcode_547_9.png', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `barcodestrip`
--

CREATE TABLE `barcodestrip` (
  `id` int(11) NOT NULL,
  `type` enum('recyclable','nonrecyclable') NOT NULL,
  `strippath` longtext NOT NULL DEFAULT '[]',
  `purchaseid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barcodestrip`
--

INSERT INTO `barcodestrip` (`id`, `type`, `strippath`, `purchaseid`) VALUES
(525, 'recyclable', 'static\\barcode_strips\\strip_525.png', 212),
(526, 'recyclable', 'static\\barcode_strips\\strip_526.png', 213),
(527, 'recyclable', 'static\\barcode_strips\\strip_527.png', 214),
(528, 'recyclable', 'static\\barcode_strips\\strip_528.png', 215),
(529, 'recyclable', 'static\\barcode_strips\\strip_529.png', 216),
(530, 'recyclable', 'static\\barcode_strips\\strip_530.png', 217),
(531, 'recyclable', 'static\\barcode_strips\\strip_531.png', 218),
(532, 'recyclable', 'static\\barcode_strips\\strip_532.png', 219),
(533, 'recyclable', 'static\\barcode_strips\\strip_533.png', 220),
(534, 'recyclable', 'static\\barcode_strips\\strip_534.png', 221),
(535, 'recyclable', 'static\\barcode_strips\\strip_535.png', 222),
(536, 'recyclable', 'static\\barcode_strips\\strip_536.png', 223),
(537, 'recyclable', 'static\\barcode_strips\\strip_537.png', 224),
(538, 'recyclable', 'static\\barcode_strips\\strip_538.png', 225),
(539, 'recyclable', 'static\\barcode_strips\\strip_539.png', 226),
(540, 'nonrecyclable', 'static\\barcode_strips\\strip_540.png', 226),
(541, 'nonrecyclable', 'static\\barcode_strips\\strip_541.png', 226),
(542, 'recyclable', 'static\\barcode_strips\\strip_542.png', 227),
(543, 'recyclable', 'static\\barcode_strips\\strip_543.png', 228),
(544, 'recyclable', 'static\\barcode_strips\\strip_544.png', 229),
(545, 'recyclable', 'static\\barcode_strips\\strip_545.png', 230),
(546, 'recyclable', 'static\\barcode_strips\\strip_546.png', 231),
(547, 'nonrecyclable', 'static\\barcode_strips\\strip_547.png', 231);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Organic'),
(2, 'Metal'),
(3, 'Paper'),
(4, 'Glass'),
(5, 'PaperCup'),
(6, 'Bottle'),
(7, 'CigarettesButt'),
(8, 'PlasticBag'),
(9, 'Straw'),
(10, 'PlasticCup');

-- --------------------------------------------------------

--
-- Table structure for table `complaint`
--

CREATE TABLE `complaint` (
  `Id` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `ComplaintDescription` text NOT NULL,
  `TicketNumber` varchar(50) NOT NULL,
  `ComplaintDate` datetime NOT NULL DEFAULT current_timestamp(),
  `ResolutionDate` datetime DEFAULT NULL,
  `AdminResponse` text DEFAULT NULL,
  `Status` enum('review','closed') DEFAULT 'review'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `complaint`
--

INSERT INTO `complaint` (`Id`, `UserId`, `ComplaintDescription`, `TicketNumber`, `ComplaintDate`, `ResolutionDate`, `AdminResponse`, `Status`) VALUES
(17, 125, 'The trash outside my house was not picked up today. It has been sitting there since morning, and it’s starting to smell. Please arrange for a pickup as soon as possible', '19333', '2025-03-25 22:25:50', NULL, NULL, 'review'),
(18, 127, 'The trash truck is coming very late in the day, causing trash to pile up outside for hours. Can you please ensure timely pickups?', '93271', '2025-03-25 22:28:34', NULL, NULL, 'closed'),
(19, 127, 'I noticed that the trash collectors are not properly segregating the waste. Recycling materials are mixed with general waste. Please address this issue', '94227', '2025-03-25 22:29:23', NULL, NULL, 'closed'),
(20, 127, 'Trash collection truck missed today\'s pickup', '11842', '2025-03-25 22:31:05', NULL, NULL, 'review'),
(21, 127, 'Collectors are spreading trash while collecting', '15025', '2025-03-25 22:31:34', '2025-03-25 22:34:30', 'We apologize for the inconvenience. A truck has been dispatched and will arrive shortly.', 'closed'),
(22, 127, 'Truck arrived late and left trash scattered', '61355', '2025-03-25 22:32:04', NULL, NULL, 'review'),
(23, 127, 'Truck arrived late and left trash scattered', '64676', '2025-03-25 22:32:06', '2025-03-24 22:35:08', ' The area will be cleaned, and the issue will be reviewed.', 'closed'),
(24, 139, 'Zone', '80657', '2025-05-17 16:54:50', NULL, NULL, 'review');

-- --------------------------------------------------------

--
-- Table structure for table `dailyreport`
--

CREATE TABLE `dailyreport` (
  `id` int(11) NOT NULL,
  `reportdate` datetime NOT NULL,
  `totaltrash` float NOT NULL,
  `category` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `zoneid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pickuprequest`
--

CREATE TABLE `pickuprequest` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `status` enum('pending','next','completed') NOT NULL DEFAULT 'pending',
  `address` varchar(255) NOT NULL,
  `phonenumber` varchar(11) NOT NULL,
  `pickupday` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') DEFAULT 'Monday',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `completed_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchase`
--

CREATE TABLE `purchase` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `totalcost` float NOT NULL,
  `purchasedate` datetime DEFAULT current_timestamp(),
  `zoneid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchase`
--

INSERT INTO `purchase` (`id`, `userid`, `totalcost`, `purchasedate`, `zoneid`) VALUES
(212, 138, 100, '2025-04-15 14:52:06', 18),
(213, 138, 100, '2025-04-15 15:10:39', 18),
(214, 138, 100, '2025-04-15 15:13:33', 18),
(215, 138, 100, '2025-04-15 15:46:51', 18),
(216, 138, 100, '2025-04-15 15:54:05', 18),
(217, 138, 100, '2025-04-15 16:11:13', 18),
(218, 138, 100, '2025-04-15 16:19:50', 18),
(219, 138, 100, '2025-04-15 16:21:37', 18),
(220, 138, 100, '2025-04-15 16:22:24', 18),
(221, 138, 100, '2025-04-15 16:23:10', 18),
(222, 138, 100, '2025-04-15 16:24:06', 18),
(223, 138, 100, '2025-04-15 16:30:28', 19),
(224, 138, 100, '2025-04-15 16:56:36', 18),
(225, 130, 100, '2025-04-16 08:15:58', 19),
(226, 127, 300, '2025-04-26 09:08:13', 20),
(227, 127, 100, '2025-04-26 09:09:38', 20),
(228, 127, 100, '2025-04-26 09:11:53', 18),
(229, 127, 100, '2025-04-26 09:12:50', 18),
(230, 127, 100, '2025-04-26 09:18:37', 20),
(231, 139, 200, '2025-05-17 11:40:39', 19);

-- --------------------------------------------------------

--
-- Table structure for table `slot`
--

CREATE TABLE `slot` (
  `id` int(11) NOT NULL,
  `dayofweek` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  `starttime` time NOT NULL,
  `endtime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `slot`
--

INSERT INTO `slot` (`id`, `dayofweek`, `starttime`, `endtime`) VALUES
(1, 'Monday', '06:00:00', '06:15:00'),
(2, 'Monday', '06:15:00', '06:30:00'),
(3, 'Monday', '06:30:00', '06:45:00'),
(4, 'Monday', '06:45:00', '07:00:00'),
(5, 'Monday', '07:00:00', '07:15:00'),
(6, 'Monday', '07:15:00', '07:30:00'),
(7, 'Monday', '07:30:00', '07:45:00'),
(8, 'Monday', '07:45:00', '08:00:00'),
(9, 'Monday', '08:00:00', '08:15:00'),
(10, 'Monday', '08:15:00', '08:30:00'),
(11, 'Monday', '08:30:00', '08:45:00'),
(12, 'Monday', '08:45:00', '09:00:00'),
(13, 'Monday', '09:00:00', '09:15:00'),
(14, 'Monday', '09:15:00', '09:30:00'),
(15, 'Monday', '09:30:00', '09:45:00'),
(16, 'Monday', '09:45:00', '10:00:00'),
(17, 'Monday', '10:00:00', '10:15:00'),
(18, 'Monday', '10:15:00', '10:30:00'),
(19, 'Monday', '10:30:00', '10:45:00'),
(20, 'Monday', '10:45:00', '11:00:00'),
(21, 'Monday', '11:00:00', '11:15:00'),
(22, 'Monday', '11:15:00', '11:30:00'),
(23, 'Monday', '11:30:00', '11:45:00'),
(24, 'Monday', '11:45:00', '12:00:00'),
(25, 'Monday', '12:00:00', '12:15:00'),
(26, 'Monday', '12:15:00', '12:30:00'),
(27, 'Monday', '12:30:00', '12:45:00'),
(28, 'Monday', '12:45:00', '13:00:00'),
(29, 'Monday', '13:00:00', '13:15:00'),
(30, 'Monday', '13:15:00', '13:30:00'),
(31, 'Monday', '13:30:00', '13:45:00'),
(32, 'Monday', '13:45:00', '14:00:00'),
(33, 'Monday', '14:00:00', '14:15:00'),
(34, 'Monday', '14:15:00', '14:30:00'),
(35, 'Monday', '14:30:00', '14:45:00'),
(36, 'Monday', '14:45:00', '15:00:00'),
(37, 'Monday', '15:00:00', '15:15:00'),
(38, 'Monday', '15:15:00', '15:30:00'),
(39, 'Monday', '15:30:00', '15:45:00'),
(40, 'Monday', '15:45:00', '16:00:00'),
(41, 'Monday', '16:00:00', '16:15:00'),
(42, 'Monday', '16:15:00', '16:30:00'),
(43, 'Monday', '16:30:00', '16:45:00'),
(44, 'Monday', '16:45:00', '17:00:00'),
(45, 'Monday', '17:00:00', '17:15:00'),
(46, 'Monday', '17:15:00', '17:30:00'),
(47, 'Monday', '17:30:00', '17:45:00'),
(48, 'Monday', '17:45:00', '18:00:00'),
(49, 'Tuesday', '06:00:00', '06:15:00'),
(50, 'Tuesday', '06:15:00', '06:30:00'),
(51, 'Tuesday', '06:30:00', '06:45:00'),
(52, 'Tuesday', '06:45:00', '07:00:00'),
(53, 'Tuesday', '07:00:00', '07:15:00'),
(54, 'Tuesday', '07:15:00', '07:30:00'),
(55, 'Tuesday', '07:30:00', '07:45:00'),
(56, 'Tuesday', '07:45:00', '08:00:00'),
(57, 'Tuesday', '08:00:00', '08:15:00'),
(58, 'Tuesday', '08:15:00', '08:30:00'),
(59, 'Tuesday', '08:30:00', '08:45:00'),
(60, 'Tuesday', '08:45:00', '09:00:00'),
(61, 'Tuesday', '09:00:00', '09:15:00'),
(62, 'Tuesday', '09:15:00', '09:30:00'),
(63, 'Tuesday', '09:30:00', '09:45:00'),
(64, 'Tuesday', '09:45:00', '10:00:00'),
(65, 'Tuesday', '10:00:00', '10:15:00'),
(66, 'Tuesday', '10:15:00', '10:30:00'),
(67, 'Tuesday', '10:30:00', '10:45:00'),
(68, 'Tuesday', '10:45:00', '11:00:00'),
(69, 'Tuesday', '11:00:00', '11:15:00'),
(70, 'Tuesday', '11:15:00', '11:30:00'),
(71, 'Tuesday', '11:30:00', '11:45:00'),
(72, 'Tuesday', '11:45:00', '12:00:00'),
(73, 'Tuesday', '12:00:00', '12:15:00'),
(74, 'Tuesday', '12:15:00', '12:30:00'),
(75, 'Tuesday', '12:30:00', '12:45:00'),
(76, 'Tuesday', '12:45:00', '13:00:00'),
(77, 'Tuesday', '13:00:00', '13:15:00'),
(78, 'Tuesday', '13:15:00', '13:30:00'),
(79, 'Tuesday', '13:30:00', '13:45:00'),
(80, 'Tuesday', '13:45:00', '14:00:00'),
(81, 'Tuesday', '14:00:00', '14:15:00'),
(82, 'Tuesday', '14:15:00', '14:30:00'),
(83, 'Tuesday', '14:30:00', '14:45:00'),
(84, 'Tuesday', '14:45:00', '15:00:00'),
(85, 'Tuesday', '15:00:00', '15:15:00'),
(86, 'Tuesday', '15:15:00', '15:30:00'),
(87, 'Tuesday', '15:30:00', '15:45:00'),
(88, 'Tuesday', '15:45:00', '16:00:00'),
(89, 'Tuesday', '16:00:00', '16:15:00'),
(90, 'Tuesday', '16:15:00', '16:30:00'),
(91, 'Tuesday', '16:30:00', '16:45:00'),
(92, 'Tuesday', '16:45:00', '17:00:00'),
(93, 'Tuesday', '17:00:00', '17:15:00'),
(94, 'Tuesday', '17:15:00', '17:30:00'),
(95, 'Tuesday', '17:30:00', '17:45:00'),
(96, 'Tuesday', '17:45:00', '18:00:00'),
(97, 'Wednesday', '06:00:00', '06:15:00'),
(98, 'Wednesday', '06:15:00', '06:30:00'),
(99, 'Wednesday', '06:30:00', '06:45:00'),
(100, 'Wednesday', '06:45:00', '07:00:00'),
(101, 'Wednesday', '07:00:00', '07:15:00'),
(102, 'Wednesday', '07:15:00', '07:30:00'),
(103, 'Wednesday', '07:30:00', '07:45:00'),
(104, 'Wednesday', '07:45:00', '08:00:00'),
(105, 'Wednesday', '08:00:00', '08:15:00'),
(106, 'Wednesday', '08:15:00', '08:30:00'),
(107, 'Wednesday', '08:30:00', '08:45:00'),
(108, 'Wednesday', '08:45:00', '09:00:00'),
(109, 'Wednesday', '09:00:00', '09:15:00'),
(110, 'Wednesday', '09:15:00', '09:30:00'),
(111, 'Wednesday', '09:30:00', '09:45:00'),
(112, 'Wednesday', '09:45:00', '10:00:00'),
(113, 'Wednesday', '10:00:00', '10:15:00'),
(114, 'Wednesday', '10:15:00', '10:30:00'),
(115, 'Wednesday', '10:30:00', '10:45:00'),
(116, 'Wednesday', '10:45:00', '11:00:00'),
(117, 'Wednesday', '11:00:00', '11:15:00'),
(118, 'Wednesday', '11:15:00', '11:30:00'),
(119, 'Wednesday', '11:30:00', '11:45:00'),
(120, 'Wednesday', '11:45:00', '12:00:00'),
(121, 'Wednesday', '12:00:00', '12:15:00'),
(122, 'Wednesday', '12:15:00', '12:30:00'),
(123, 'Wednesday', '12:30:00', '12:45:00'),
(124, 'Wednesday', '12:45:00', '13:00:00'),
(125, 'Wednesday', '13:00:00', '13:15:00'),
(126, 'Wednesday', '13:15:00', '13:30:00'),
(127, 'Wednesday', '13:30:00', '13:45:00'),
(128, 'Wednesday', '13:45:00', '14:00:00'),
(129, 'Wednesday', '14:00:00', '14:15:00'),
(130, 'Wednesday', '14:15:00', '14:30:00'),
(131, 'Wednesday', '14:30:00', '14:45:00'),
(132, 'Wednesday', '14:45:00', '15:00:00'),
(133, 'Wednesday', '15:00:00', '15:15:00'),
(134, 'Wednesday', '15:15:00', '15:30:00'),
(135, 'Wednesday', '15:30:00', '15:45:00'),
(136, 'Wednesday', '15:45:00', '16:00:00'),
(137, 'Wednesday', '16:00:00', '16:15:00'),
(138, 'Wednesday', '16:15:00', '16:30:00'),
(139, 'Wednesday', '16:30:00', '16:45:00'),
(140, 'Wednesday', '16:45:00', '17:00:00'),
(141, 'Wednesday', '17:00:00', '17:15:00'),
(142, 'Wednesday', '17:15:00', '17:30:00'),
(143, 'Wednesday', '17:30:00', '17:45:00'),
(144, 'Wednesday', '17:45:00', '18:00:00'),
(145, 'Thursday', '06:00:00', '06:15:00'),
(146, 'Thursday', '06:15:00', '06:30:00'),
(147, 'Thursday', '06:30:00', '06:45:00'),
(148, 'Thursday', '06:45:00', '07:00:00'),
(149, 'Thursday', '07:00:00', '07:15:00'),
(150, 'Thursday', '07:15:00', '07:30:00'),
(151, 'Thursday', '07:30:00', '07:45:00'),
(152, 'Thursday', '07:45:00', '08:00:00'),
(153, 'Thursday', '08:00:00', '08:15:00'),
(154, 'Thursday', '08:15:00', '08:30:00'),
(155, 'Thursday', '08:30:00', '08:45:00'),
(156, 'Thursday', '08:45:00', '09:00:00'),
(157, 'Thursday', '09:00:00', '09:15:00'),
(158, 'Thursday', '09:15:00', '09:30:00'),
(159, 'Thursday', '09:30:00', '09:45:00'),
(160, 'Thursday', '09:45:00', '10:00:00'),
(161, 'Thursday', '10:00:00', '10:15:00'),
(162, 'Thursday', '10:15:00', '10:30:00'),
(163, 'Thursday', '10:30:00', '10:45:00'),
(164, 'Thursday', '10:45:00', '11:00:00'),
(165, 'Thursday', '11:00:00', '11:15:00'),
(166, 'Thursday', '11:15:00', '11:30:00'),
(167, 'Thursday', '11:30:00', '11:45:00'),
(168, 'Thursday', '11:45:00', '12:00:00'),
(169, 'Thursday', '12:00:00', '12:15:00'),
(170, 'Thursday', '12:15:00', '12:30:00'),
(171, 'Thursday', '12:30:00', '12:45:00'),
(172, 'Thursday', '12:45:00', '13:00:00'),
(173, 'Thursday', '13:00:00', '13:15:00'),
(174, 'Thursday', '13:15:00', '13:30:00'),
(175, 'Thursday', '13:30:00', '13:45:00'),
(176, 'Thursday', '13:45:00', '14:00:00'),
(177, 'Thursday', '14:00:00', '14:15:00'),
(178, 'Thursday', '14:15:00', '14:30:00'),
(179, 'Thursday', '14:30:00', '14:45:00'),
(180, 'Thursday', '14:45:00', '15:00:00'),
(181, 'Thursday', '15:00:00', '15:15:00'),
(182, 'Thursday', '15:15:00', '15:30:00'),
(183, 'Thursday', '15:30:00', '15:45:00'),
(184, 'Thursday', '15:45:00', '16:00:00'),
(185, 'Thursday', '16:00:00', '16:15:00'),
(186, 'Thursday', '16:15:00', '16:30:00'),
(187, 'Thursday', '16:30:00', '16:45:00'),
(188, 'Thursday', '16:45:00', '17:00:00'),
(189, 'Thursday', '17:00:00', '17:15:00'),
(190, 'Thursday', '17:15:00', '17:30:00'),
(191, 'Thursday', '17:30:00', '17:45:00'),
(192, 'Thursday', '17:45:00', '18:00:00'),
(193, 'Friday', '06:00:00', '06:15:00'),
(194, 'Friday', '06:15:00', '06:30:00'),
(195, 'Friday', '06:30:00', '06:45:00'),
(196, 'Friday', '06:45:00', '07:00:00'),
(197, 'Friday', '07:00:00', '07:15:00'),
(198, 'Friday', '07:15:00', '07:30:00'),
(199, 'Friday', '07:30:00', '07:45:00'),
(200, 'Friday', '07:45:00', '08:00:00'),
(201, 'Friday', '08:00:00', '08:15:00'),
(202, 'Friday', '08:15:00', '08:30:00'),
(203, 'Friday', '08:30:00', '08:45:00'),
(204, 'Friday', '08:45:00', '09:00:00'),
(205, 'Friday', '09:00:00', '09:15:00'),
(206, 'Friday', '09:15:00', '09:30:00'),
(207, 'Friday', '09:30:00', '09:45:00'),
(208, 'Friday', '09:45:00', '10:00:00'),
(209, 'Friday', '10:00:00', '10:15:00'),
(210, 'Friday', '10:15:00', '10:30:00'),
(211, 'Friday', '10:30:00', '10:45:00'),
(212, 'Friday', '10:45:00', '11:00:00'),
(213, 'Friday', '11:00:00', '11:15:00'),
(214, 'Friday', '11:15:00', '11:30:00'),
(215, 'Friday', '11:30:00', '11:45:00'),
(216, 'Friday', '11:45:00', '12:00:00'),
(217, 'Friday', '12:00:00', '12:15:00'),
(218, 'Friday', '12:15:00', '12:30:00'),
(219, 'Friday', '12:30:00', '12:45:00'),
(220, 'Friday', '12:45:00', '13:00:00'),
(221, 'Friday', '13:00:00', '13:15:00'),
(222, 'Friday', '13:15:00', '13:30:00'),
(223, 'Friday', '13:30:00', '13:45:00'),
(224, 'Friday', '13:45:00', '14:00:00'),
(225, 'Friday', '14:00:00', '14:15:00'),
(226, 'Friday', '14:15:00', '14:30:00'),
(227, 'Friday', '14:30:00', '14:45:00'),
(228, 'Friday', '14:45:00', '15:00:00'),
(229, 'Friday', '15:00:00', '15:15:00'),
(230, 'Friday', '15:15:00', '15:30:00'),
(231, 'Friday', '15:30:00', '15:45:00'),
(232, 'Friday', '15:45:00', '16:00:00'),
(233, 'Friday', '16:00:00', '16:15:00'),
(234, 'Friday', '16:15:00', '16:30:00'),
(235, 'Friday', '16:30:00', '16:45:00'),
(236, 'Friday', '16:45:00', '17:00:00'),
(237, 'Friday', '17:00:00', '17:15:00'),
(238, 'Friday', '17:15:00', '17:30:00'),
(239, 'Friday', '17:30:00', '17:45:00'),
(240, 'Friday', '17:45:00', '18:00:00'),
(241, 'Saturday', '06:00:00', '06:15:00'),
(242, 'Saturday', '06:15:00', '06:30:00'),
(243, 'Saturday', '06:30:00', '06:45:00'),
(244, 'Saturday', '06:45:00', '07:00:00'),
(245, 'Saturday', '07:00:00', '07:15:00'),
(246, 'Saturday', '07:15:00', '07:30:00'),
(247, 'Saturday', '07:30:00', '07:45:00'),
(248, 'Saturday', '07:45:00', '08:00:00'),
(249, 'Saturday', '08:00:00', '08:15:00'),
(250, 'Saturday', '08:15:00', '08:30:00'),
(251, 'Saturday', '08:30:00', '08:45:00'),
(252, 'Saturday', '08:45:00', '09:00:00'),
(253, 'Saturday', '09:00:00', '09:15:00'),
(254, 'Saturday', '09:15:00', '09:30:00'),
(255, 'Saturday', '09:30:00', '09:45:00'),
(256, 'Saturday', '09:45:00', '10:00:00'),
(257, 'Saturday', '10:00:00', '10:15:00'),
(258, 'Saturday', '10:15:00', '10:30:00'),
(259, 'Saturday', '10:30:00', '10:45:00'),
(260, 'Saturday', '10:45:00', '11:00:00'),
(261, 'Saturday', '11:00:00', '11:15:00'),
(262, 'Saturday', '11:15:00', '11:30:00'),
(263, 'Saturday', '11:30:00', '11:45:00'),
(264, 'Saturday', '11:45:00', '12:00:00'),
(265, 'Saturday', '12:00:00', '12:15:00'),
(266, 'Saturday', '12:15:00', '12:30:00'),
(267, 'Saturday', '12:30:00', '12:45:00'),
(268, 'Saturday', '12:45:00', '13:00:00'),
(269, 'Saturday', '13:00:00', '13:15:00'),
(270, 'Saturday', '13:15:00', '13:30:00'),
(271, 'Saturday', '13:30:00', '13:45:00'),
(272, 'Saturday', '13:45:00', '14:00:00'),
(273, 'Saturday', '14:00:00', '14:15:00'),
(274, 'Saturday', '14:15:00', '14:30:00'),
(275, 'Saturday', '14:30:00', '14:45:00'),
(276, 'Saturday', '14:45:00', '15:00:00'),
(277, 'Saturday', '15:00:00', '15:15:00'),
(278, 'Saturday', '15:15:00', '15:30:00'),
(279, 'Saturday', '15:30:00', '15:45:00'),
(280, 'Saturday', '15:45:00', '16:00:00'),
(281, 'Saturday', '16:00:00', '16:15:00'),
(282, 'Saturday', '16:15:00', '16:30:00'),
(283, 'Saturday', '16:30:00', '16:45:00'),
(284, 'Saturday', '16:45:00', '17:00:00'),
(285, 'Saturday', '17:00:00', '17:15:00'),
(286, 'Saturday', '17:15:00', '17:30:00'),
(287, 'Saturday', '17:30:00', '17:45:00'),
(288, 'Saturday', '17:45:00', '18:00:00'),
(289, 'Sunday', '06:00:00', '06:15:00'),
(290, 'Sunday', '06:15:00', '06:30:00'),
(291, 'Sunday', '06:30:00', '06:45:00'),
(292, 'Sunday', '06:45:00', '07:00:00'),
(293, 'Sunday', '07:00:00', '07:15:00'),
(294, 'Sunday', '07:15:00', '07:30:00'),
(295, 'Sunday', '07:30:00', '07:45:00'),
(296, 'Sunday', '07:45:00', '08:00:00'),
(297, 'Sunday', '08:00:00', '08:15:00'),
(298, 'Sunday', '08:15:00', '08:30:00'),
(299, 'Sunday', '08:30:00', '08:45:00'),
(300, 'Sunday', '08:45:00', '09:00:00'),
(301, 'Sunday', '09:00:00', '09:15:00'),
(302, 'Sunday', '09:15:00', '09:30:00'),
(303, 'Sunday', '09:30:00', '09:45:00'),
(304, 'Sunday', '09:45:00', '10:00:00'),
(305, 'Sunday', '10:00:00', '10:15:00'),
(306, 'Sunday', '10:15:00', '10:30:00'),
(307, 'Sunday', '10:30:00', '10:45:00'),
(308, 'Sunday', '10:45:00', '11:00:00'),
(309, 'Sunday', '11:00:00', '11:15:00'),
(310, 'Sunday', '11:15:00', '11:30:00'),
(311, 'Sunday', '11:30:00', '11:45:00'),
(312, 'Sunday', '11:45:00', '12:00:00'),
(313, 'Sunday', '12:00:00', '12:15:00'),
(314, 'Sunday', '12:15:00', '12:30:00'),
(315, 'Sunday', '12:30:00', '12:45:00'),
(316, 'Sunday', '12:45:00', '13:00:00'),
(317, 'Sunday', '13:00:00', '13:15:00'),
(318, 'Sunday', '13:15:00', '13:30:00'),
(319, 'Sunday', '13:30:00', '13:45:00'),
(320, 'Sunday', '13:45:00', '14:00:00'),
(321, 'Sunday', '14:00:00', '14:15:00'),
(322, 'Sunday', '14:15:00', '14:30:00'),
(323, 'Sunday', '14:30:00', '14:45:00'),
(324, 'Sunday', '14:45:00', '15:00:00'),
(325, 'Sunday', '15:00:00', '15:15:00'),
(326, 'Sunday', '15:15:00', '15:30:00'),
(327, 'Sunday', '15:30:00', '15:45:00'),
(328, 'Sunday', '15:45:00', '16:00:00'),
(329, 'Sunday', '16:00:00', '16:15:00'),
(330, 'Sunday', '16:15:00', '16:30:00'),
(331, 'Sunday', '16:30:00', '16:45:00'),
(332, 'Sunday', '16:45:00', '17:00:00'),
(333, 'Sunday', '17:00:00', '17:15:00'),
(334, 'Sunday', '17:15:00', '17:30:00'),
(335, 'Sunday', '17:30:00', '17:45:00'),
(336, 'Sunday', '17:45:00', '18:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `trashitems`
--

CREATE TABLE `trashitems` (
  `id` int(11) NOT NULL,
  `categoryid` int(11) NOT NULL,
  `detectiondate` datetime NOT NULL,
  `weight` float NOT NULL,
  `barcodeid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trashitems`
--

INSERT INTO `trashitems` (`id`, `categoryid`, `detectiondate`, `weight`, `barcodeid`) VALUES
(204, 4, '2025-05-03 11:10:42', 0, 5293),
(205, 1, '2025-05-03 11:10:43', 0, 5293),
(206, 1, '2025-05-03 11:10:43', 0, 5293),
(207, 9, '2025-05-03 11:10:44', 0, 5293),
(208, 4, '2025-05-03 11:10:45', 0, 5293),
(209, 4, '2025-05-03 11:10:46', 0, 5293),
(210, 4, '2025-05-03 11:10:47', 0, 5293),
(211, 5, '2025-05-03 11:10:49', 0, 5293);

-- --------------------------------------------------------

--
-- Table structure for table `truck`
--

CREATE TABLE `truck` (
  `id` int(11) NOT NULL,
  `licensenumber` varchar(50) NOT NULL,
  `model` varchar(100) NOT NULL,
  `chassisnumber` varchar(50) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `truck`
--

INSERT INTO `truck` (`id`, `licensenumber`, `model`, `chassisnumber`, `status`) VALUES
(1, 'LHR-1234', 'Toyota Hilux', 'CHIL123456', 'active'),
(2, 'KHI-5678', 'Suzuki Pickup', 'CHSU567890', 'active'),
(3, 'ISB-9101', 'Honda Acty', 'CHHO987654', 'active'),
(4, 'LHR-4321', 'Mazda Titan', 'CHMT321987', 'active'),
(5, 'KHI-8765', 'Hino Dutro', 'CHDU876543', 'inactive'),
(6, 'XHL-7658', 'Toyota', '02034934', 'active'),
(7, 'LEA 1235', 'Hino 500', 'XJH34KDF823', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `truckassignment`
--

CREATE TABLE `truckassignment` (
  `id` int(11) NOT NULL,
  `truckid` int(11) NOT NULL,
  `zoneid` int(11) NOT NULL,
  `driverid` int(11) NOT NULL,
  `collectorid` int(11) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `assignmentdate` date NOT NULL DEFAULT curdate(),
  `expiration_date` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `truckassignment`
--

INSERT INTO `truckassignment` (`id`, `truckid`, `zoneid`, `driverid`, `collectorid`, `status`, `assignmentdate`, `expiration_date`) VALUES
(30, 5, 20, 68, 129, 'active', '2025-04-30', '2025-05-06 11:02:28'),
(31, 6, 21, 73, 69, 'active', '2025-04-30', NULL),
(32, 2, 18, 67, 121, 'active', '2025-04-30', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `truckschedule`
--

CREATE TABLE `truckschedule` (
  `id` int(11) NOT NULL,
  `truckid` int(11) NOT NULL,
  `scheduleid` int(11) NOT NULL,
  `sequencenumber` int(11) NOT NULL,
  `pickuprequestid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phonenumber` varchar(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `role` enum('user','driver','operator','collector','admin') NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `rank` float DEFAULT NULL,
  `profile` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `phonenumber`, `address`, `latitude`, `longitude`, `role`, `status`, `rank`, `profile`) VALUES
(63, 'Shahzaib Malik', 'shahzaibmalik123@gmail.com', 'shahzaib', '03123455667', NULL, 0, 0, 'driver', 'active', NULL, 'EmployeeProfile/profile_63_20250329213021_b4799c150f.jpg'),
(66, 'Adeel Khan', 'adeelkhan89@gmail.com', 'adeel', '03214567890', NULL, 0, 0, 'driver', 'active', NULL, NULL),
(67, 'Bilal Ahmed', 'bilalahmed77@gmail.com', 'bilal', '03325678901', NULL, 0, 0, 'driver', 'active', NULL, NULL),
(68, 'Noman Raza', 'driver@cleany.com', 'driver', '03016754321', NULL, 33.6486, 73.0827, 'driver', 'active', NULL, NULL),
(69, 'Usman Tariq', 'usmantariq45@gmail.com', 'usman', '03011234567', NULL, 0, 0, 'collector', 'active', NULL, NULL),
(70, 'Zain Ali', 'zainali78@gmail.com', 'zain', '03122334455', NULL, 0, 0, 'driver', 'active', NULL, NULL),
(71, 'Hassan Raza', 'hassanraza90@gmail.com', 'abc', '03033445566', NULL, 0, 0, 'operator', 'active', NULL, NULL),
(72, 'Saad Mehmood', 'saadmehmood21@gmail.com', 'saad', '03216549876', NULL, 0, 0, 'collector', 'active', NULL, NULL),
(73, 'Rizwan Javed', 'rizwanjaved63@gmail.com', 'rizwan', '03325498763', NULL, 0, 0, 'driver', 'active', NULL, NULL),
(98, 'Eman', 'admin@cleany.com', 'admin', '03121223231', NULL, 0, 0, 'admin', 'active', NULL, NULL),
(121, 'Fakhar ', 'fakhar@gmail.com', '123', '03121212121', NULL, NULL, NULL, 'collector', 'active', NULL, NULL),
(124, 'Shamas', 'shamas@gmail.com', '123', '03235689085', NULL, 33.6481, 73.0829, 'user', 'active', 61, NULL),
(125, 'Rohan Abbasi', 'rohanabbasi@gmail.com', '123', '03235689085', NULL, 33.6386, 73.0829, 'user', 'active', 34.75, NULL),
(126, 'Ahsan Malik', 'ahsanmalik@gmail.com', '123', '03124567890', NULL, 33.6436, 73.0791, 'user', 'active', 92.74, NULL),
(127, 'Saad Amhed', 'saadamhed@gmail.com', '123', '03158528527', NULL, 33.6486, 73.0827, 'user', 'active', 100, 'static/profile_pics/profile_127_bbb0fdb2.jpg'),
(128, 'Bilal Saeed', 'bilalsaeed@gmail.com', 'bilal', '03245689526', NULL, NULL, NULL, 'driver', 'active', NULL, NULL),
(129, 'Faizal Raza', 'collector@cleany.com', 'collector', '03235680523', NULL, NULL, NULL, 'collector', 'active', NULL, NULL),
(130, 'Ali Raza', 'aliraza@gmail.com', '123', '03214567890', NULL, 33.6485, 73.0826, 'user', 'active', 60.59, NULL),
(131, 'Ali Ahmed', 'aliahmed@gmail.com', '123', '03218367890', NULL, 33.648, NULL, 'user', 'active', 32.8, NULL),
(132, 'Ayesha Fatima', 'ayeshafatima@gmail.com', '123', '03218927382', NULL, 33.5961, 73.0625, 'user', 'active', 90.32, NULL),
(133, 'Hayya Noor', 'hayyanoor@gmail.com', '123', '03245676543', NULL, 33.599, 73.0584, 'user', 'active', 72.14, NULL),
(134, 'Hooran', 'hoorain@gmail.com', '123', '03126543903', NULL, 33.5973, 73.0612, 'user', 'active', 80.43, NULL),
(135, 'Hussain', 'hussain@gmail.com', '123', '03123343536', NULL, 33.5958, 73.06, 'user', 'active', 10.23, NULL),
(136, 'Umair Abbasi', 'umairabbasi@gmail.com', '123', '03132312123', NULL, 33.5945, 73.0578, 'user', 'active', 54.34, NULL),
(137, 'Mubashir', 'operator@cleany.com', 'operator', '03122123234', NULL, NULL, NULL, 'operator', 'active', 100, NULL),
(138, 'Ali Awaan', 'aliawaan@gmail.com', '123', '03125609085', NULL, 33.6486, 73.0827, 'user', 'active', 100, 'static/profile_pics/profile_138_c5328c01.jpg'),
(139, 'Test', 'test@cleany.com', 'test', NULL, NULL, 33.6488, 73.0732, 'user', 'active', 100, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `userzone`
--

CREATE TABLE `userzone` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `zoneid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zone`
--

CREATE TABLE `zone` (
  `id` int(11) NOT NULL,
  `start_point` varchar(255) NOT NULL,
  `end_point` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zone`
--

INSERT INTO `zone` (`id`, `start_point`, `end_point`) VALUES
(18, 'Shamsabad', 'Rehmanaabad'),
(19, 'I-8', 'I-9'),
(20, 'Moti Bazar', 'Chaklala Cantt'),
(21, 'Murree Road', 'Kashmir Road');

-- --------------------------------------------------------

--
-- Table structure for table `zonecoordinate`
--

CREATE TABLE `zonecoordinate` (
  `id` int(11) NOT NULL,
  `zoneid` int(11) NOT NULL,
  `longitude` float NOT NULL,
  `latitude` float NOT NULL,
  `sequence` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zonecoordinate`
--

INSERT INTO `zonecoordinate` (`id`, `zoneid`, `longitude`, `latitude`, `sequence`) VALUES
(7, 18, 73.0752, 33.6373, 1),
(8, 18, 73.0827, 33.6486, 2),
(9, 18, 73.0791, 33.6436, 3),
(10, 19, 73.071, 33.6691, 1),
(11, 19, 73.0596, 33.6585, 2),
(12, 19, 73.0673, 33.6641, 3),
(13, 20, 73.0589, 33.6182, 1),
(14, 20, 73.0946, 33.6087, 2),
(15, 20, 73.0713, 33.6123, 3),
(16, 21, 73.0555, 33.5932, 1),
(17, 21, 73.0592, 33.6001, 2),
(18, 21, 73.0639, 33.5984, 3),
(19, 21, 73.0601, 33.592, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barcode`
--
ALTER TABLE `barcode`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `barcode_ibfk_2` (`stripid`);

--
-- Indexes for table `barcodestrip`
--
ALTER TABLE `barcodestrip`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_purchase` (`purchaseid`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `complaint`
--
ALTER TABLE `complaint`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_user_id` (`UserId`);

--
-- Indexes for table `dailyreport`
--
ALTER TABLE `dailyreport`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_report_Zone` (`zoneid`);

--
-- Indexes for table `pickuprequest`
--
ALTER TABLE `pickuprequest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`),
  ADD KEY `zoneid` (`zoneid`);

--
-- Indexes for table `slot`
--
ALTER TABLE `slot`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trashitems`
--
ALTER TABLE `trashitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`categoryid`),
  ADD KEY `fk_barcode_trash` (`barcodeid`);

--
-- Indexes for table `truck`
--
ALTER TABLE `truck`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `truckassignment`
--
ALTER TABLE `truckassignment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `truckid` (`truckid`),
  ADD KEY `zoneid` (`zoneid`),
  ADD KEY `driverid` (`driverid`),
  ADD KEY `collectorid` (`collectorid`);

--
-- Indexes for table `truckschedule`
--
ALTER TABLE `truckschedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `truck_id` (`truckid`),
  ADD KEY `schedule_id` (`scheduleid`),
  ADD KEY `fk_pickuprequest` (`pickuprequestid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `userzone`
--
ALTER TABLE `userzone`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`),
  ADD KEY `zoneid` (`zoneid`);

--
-- Indexes for table `zone`
--
ALTER TABLE `zone`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zonecoordinate`
--
ALTER TABLE `zonecoordinate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_zoneid` (`zoneid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barcode`
--
ALTER TABLE `barcode`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5314;

--
-- AUTO_INCREMENT for table `barcodestrip`
--
ALTER TABLE `barcodestrip`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=548;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `complaint`
--
ALTER TABLE `complaint`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `dailyreport`
--
ALTER TABLE `dailyreport`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pickuprequest`
--
ALTER TABLE `pickuprequest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- AUTO_INCREMENT for table `purchase`
--
ALTER TABLE `purchase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=232;

--
-- AUTO_INCREMENT for table `slot`
--
ALTER TABLE `slot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=337;

--
-- AUTO_INCREMENT for table `trashitems`
--
ALTER TABLE `trashitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=212;

--
-- AUTO_INCREMENT for table `truck`
--
ALTER TABLE `truck`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `truckassignment`
--
ALTER TABLE `truckassignment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `truckschedule`
--
ALTER TABLE `truckschedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT for table `userzone`
--
ALTER TABLE `userzone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `zone`
--
ALTER TABLE `zone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `zonecoordinate`
--
ALTER TABLE `zonecoordinate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `barcode`
--
ALTER TABLE `barcode`
  ADD CONSTRAINT `barcode_ibfk_2` FOREIGN KEY (`stripid`) REFERENCES `barcodestrip` (`id`);

--
-- Constraints for table `barcodestrip`
--
ALTER TABLE `barcodestrip`
  ADD CONSTRAINT `fk_purchase` FOREIGN KEY (`purchaseid`) REFERENCES `purchase` (`id`);

--
-- Constraints for table `complaint`
--
ALTER TABLE `complaint`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`UserId`) REFERENCES `user` (`id`);

--
-- Constraints for table `dailyreport`
--
ALTER TABLE `dailyreport`
  ADD CONSTRAINT `FK_report_Zone` FOREIGN KEY (`zoneid`) REFERENCES `zone` (`id`);

--
-- Constraints for table `pickuprequest`
--
ALTER TABLE `pickuprequest`
  ADD CONSTRAINT `pickuprequest_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`);

--
-- Constraints for table `purchase`
--
ALTER TABLE `purchase`
  ADD CONSTRAINT `purchase_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `purchase_ibfk_2` FOREIGN KEY (`zoneid`) REFERENCES `zone` (`id`);

--
-- Constraints for table `trashitems`
--
ALTER TABLE `trashitems`
  ADD CONSTRAINT `fk_barcode_trash` FOREIGN KEY (`barcodeid`) REFERENCES `barcode` (`Id`),
  ADD CONSTRAINT `trashitems_ibfk_1` FOREIGN KEY (`categoryid`) REFERENCES `category` (`id`);

--
-- Constraints for table `truckassignment`
--
ALTER TABLE `truckassignment`
  ADD CONSTRAINT `truckassignment_ibfk_1` FOREIGN KEY (`truckid`) REFERENCES `truck` (`id`),
  ADD CONSTRAINT `truckassignment_ibfk_2` FOREIGN KEY (`zoneid`) REFERENCES `zone` (`id`),
  ADD CONSTRAINT `truckassignment_ibfk_3` FOREIGN KEY (`driverid`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `truckassignment_ibfk_4` FOREIGN KEY (`collectorid`) REFERENCES `user` (`id`);

--
-- Constraints for table `truckschedule`
--
ALTER TABLE `truckschedule`
  ADD CONSTRAINT `fk_pickuprequest` FOREIGN KEY (`pickuprequestid`) REFERENCES `pickuprequest` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `truckschedule_ibfk_1` FOREIGN KEY (`truckid`) REFERENCES `truck` (`id`),
  ADD CONSTRAINT `truckschedule_ibfk_2` FOREIGN KEY (`scheduleid`) REFERENCES `slot` (`id`);

--
-- Constraints for table `userzone`
--
ALTER TABLE `userzone`
  ADD CONSTRAINT `userzone_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `userzone_ibfk_2` FOREIGN KEY (`zoneid`) REFERENCES `zone` (`id`);

--
-- Constraints for table `zonecoordinate`
--
ALTER TABLE `zonecoordinate`
  ADD CONSTRAINT `fk_zoneid` FOREIGN KEY (`zoneid`) REFERENCES `zone` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
