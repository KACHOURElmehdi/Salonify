-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:4306
-- Generation Time: May 17, 2025 at 06:12 PM
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
-- Database: `barber_booking_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `barbers`
--

CREATE TABLE `barbers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `bio` text DEFAULT NULL,
  `years_of_experience` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barbers`
--

INSERT INTO `barbers` (`id`, `user_id`, `shop_id`, `bio`, `years_of_experience`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 'Spécialiste coupes classiques et rasages précis.', 5, 1, '2025-05-17 16:00:26', '2025-05-17 16:00:26'),
(2, 3, 2, 'Expert en coiffure moderne et soins de la barbe.', 3, 1, '2025-05-17 16:00:26', '2025-05-17 16:00:26'),
(3, 4, 1, 'Troisième barbier…', 2, 1, '2025-05-17 16:03:14', '2025-05-17 16:03:14');

-- --------------------------------------------------------

--
-- Table structure for table `barber_schedules`
--

CREATE TABLE `barber_schedules` (
  `id` int(11) NOT NULL,
  `barber_id` int(11) NOT NULL,
  `day_of_week` tinyint(4) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `is_available` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `barber_services`
--

CREATE TABLE `barber_services` (
  `barber_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `price_override` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barber_services`
--

INSERT INTO `barber_services` (`barber_id`, `service_id`, `price_override`, `created_at`) VALUES
(1, 1, 90.00, '2025-05-17 16:02:55'),
(1, 2, NULL, '2025-05-17 16:02:55'),
(1, 3, NULL, '2025-05-17 16:02:55'),
(2, 1, NULL, '2025-05-17 16:02:55'),
(2, 2, 70.00, '2025-05-17 16:02:55'),
(2, 3, NULL, '2025-05-17 16:02:55');

-- --------------------------------------------------------

--
-- Table structure for table `barber_time_off`
--

CREATE TABLE `barber_time_off` (
  `id` int(11) NOT NULL,
  `barber_id` int(11) NOT NULL,
  `start_datetime` datetime NOT NULL,
  `end_datetime` datetime NOT NULL,
  `reason` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `barber_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `booking_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `status` enum('pending','confirmed','completed','cancelled') DEFAULT 'pending',
  `total_price` decimal(10,2) NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `duration_minutes` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `title`, `description`, `duration_minutes`, `price`, `created_at`, `updated_at`) VALUES
(1, 'Standard Haircut', 'Coupe de cheveux classique', 30, 100.00, '2025-05-17 16:00:26', '2025-05-17 16:00:26'),
(2, 'Deluxe Shave', 'Rasage doux avec serviette chaude', 20, 80.00, '2025-05-17 16:00:26', '2025-05-17 16:00:26'),
(3, 'Beard Trim', 'Taillage et mise en forme de la barbe', 15, 50.00, '2025-05-17 16:00:26', '2025-05-17 16:00:26');

-- --------------------------------------------------------

--
-- Table structure for table `shops`
--

CREATE TABLE `shops` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(50) NOT NULL,
  `zip_code` varchar(20) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `opening_time` time NOT NULL,
  `closing_time` time NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shops`
--

INSERT INTO `shops` (`id`, `name`, `address`, `city`, `state`, `zip_code`, `phone`, `email`, `opening_time`, `closing_time`, `created_at`, `updated_at`) VALUES
(1, 'Downtown Cuts', '123 Main St', 'Casablanca', 'Casablanca', '20000', '0522123456', 'contact@downtowncuts.ma', '09:00:00', '20:00:00', '2025-05-17 16:00:26', '2025-05-17 16:00:26'),
(2, 'Rabat Styles', '45 Avenue Mohammed V', 'Rabat', 'Rabat', '10000', '0537123456', 'hello@rabastyles.ma', '10:00:00', '19:00:00', '2025-05-17 16:00:26', '2025-05-17 16:00:26');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('customer','barber','admin') DEFAULT 'customer',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `phone`, `password_hash`, `role`, `created_at`, `updated_at`) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', '0612345678', 'hash_pwd_1', 'customer', '2025-05-17 16:00:26', '2025-05-17 16:00:26'),
(2, 'Jane', 'Barber', 'jane.barber@example.com', '0623456789', 'hash_pwd_2', 'barber', '2025-05-17 16:00:26', '2025-05-17 16:00:26'),
(3, 'Bob', 'Clippers', 'bob.clippers@example.com', '0634567890', 'hash_pwd_3', 'barber', '2025-05-17 16:00:26', '2025-05-17 16:00:26'),
(4, 'Admin', 'User', 'admin@example.com', '0645678901', 'hash_pwd_4', 'admin', '2025-05-17 16:00:26', '2025-05-17 16:00:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barbers`
--
ALTER TABLE `barbers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `shop_id` (`shop_id`);

--
-- Indexes for table `barber_schedules`
--
ALTER TABLE `barber_schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `barber_id` (`barber_id`);

--
-- Indexes for table `barber_services`
--
ALTER TABLE `barber_services`
  ADD PRIMARY KEY (`barber_id`,`service_id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `barber_time_off`
--
ALTER TABLE `barber_time_off`
  ADD PRIMARY KEY (`id`),
  ADD KEY `barber_id` (`barber_id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `barber_id` (`barber_id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `shop_id` (`shop_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shops`
--
ALTER TABLE `shops`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barbers`
--
ALTER TABLE `barbers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `barber_schedules`
--
ALTER TABLE `barber_schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `barber_time_off`
--
ALTER TABLE `barber_time_off`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `shops`
--
ALTER TABLE `shops`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `barbers`
--
ALTER TABLE `barbers`
  ADD CONSTRAINT `barbers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `barbers_ibfk_2` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`);

--
-- Constraints for table `barber_schedules`
--
ALTER TABLE `barber_schedules`
  ADD CONSTRAINT `barber_schedules_ibfk_1` FOREIGN KEY (`barber_id`) REFERENCES `barbers` (`id`);

--
-- Constraints for table `barber_services`
--
ALTER TABLE `barber_services`
  ADD CONSTRAINT `barber_services_ibfk_1` FOREIGN KEY (`barber_id`) REFERENCES `barbers` (`id`),
  ADD CONSTRAINT `barber_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`);

--
-- Constraints for table `barber_time_off`
--
ALTER TABLE `barber_time_off`
  ADD CONSTRAINT `barber_time_off_ibfk_1` FOREIGN KEY (`barber_id`) REFERENCES `barbers` (`id`);

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`barber_id`) REFERENCES `barbers` (`id`),
  ADD CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  ADD CONSTRAINT `bookings_ibfk_4` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
