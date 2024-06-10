-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2024 at 07:54 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

-- SET SQL_MODE = "STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation`
--

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` varchar(36) NOT NULL,
  `vacationId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
('45568ba2-0c37-11ef-a0ca-8c1759fce107', '2d1fb6b9-b623-4d94-aaf2-481929a27c06'),
('b8f884f3-0cff-11ef-a0ca-8c1759fce107', '00bedbca-184c-11ef-a3aa-8c1759fce107'),
('b8f884f3-0cff-11ef-a0ca-8c1759fce107', 'd7d04fb2-1834-11ef-a3aa-8c1759fce107'),
('b8f884f3-0cff-11ef-a0ca-8c1759fce107', '00bf27a2-184c-11ef-a3aa-8c1759fce107'),
('b8f884f3-0cff-11ef-a0ca-8c1759fce107', '00bf6413-184c-11ef-a3aa-8c1759fce107'),
('b8f884f3-0cff-11ef-a0ca-8c1759fce107', 'deda65e7-1830-11ef-a3aa-8c1759fce107'),
('b8f884f3-0cff-11ef-a0ca-8c1759fce107', '8d1aa4c1-1836-11ef-a3aa-8c1759fce107');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
('3ec422aa-0d00-11ef-a0ca-8c1759fce107', 'eliya', 'ben gal', 'eliya@gmail.com', '77069578e7fd534f22121188eb07864c', 2),
('45568ba2-0c37-11ef-a0ca-8c1759fce107', 'hagay Noach', 'ben gal', 'hagayben@gmail.com', 'f9e268530f6eb6b18bfd9d1e311c916b', 1),
('b8f884f3-0cff-11ef-a0ca-8c1759fce107', 'nizan', 'ben gal', 'nizan@gmail.com', 'f9e268530f6eb6b18bfd9d1e311c916b', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` varchar(36) NOT NULL DEFAULT 'uuid()',
  `destination` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `imageName` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
('00bedbca-184c-11ef-a3aa-8c1759fce107', 'Amsterdam', 'Famous museums, tulips, canal-lined streets, \"coffee shops\" and high-end boutiques await you in Amsterdam. Here, you can spend your days gazing at Vincent van Gogh paintings, relaxing in Vondelpark and shopping in The Nine Streets area. Immerse yourself i', '2024-04-30', '2024-05-30', 2800, '428af920-34e8-4f69-99dd-0394c72824bd.jpeg'),
('00bf096f-184c-11ef-a3aa-8c1759fce107', 'Great Barrier Reef', 'The globe\'s largest coral reef system – and one of the original Seven Natural Wonders of the World – touts one-of-a-kind scenery. ', '2024-06-30', '2024-09-27', 12000, '1a97f007-92ec-4753-bd75-5f87a644619c.jpeg'),
('00bf193d-184c-11ef-a3aa-8c1759fce107', 'Barcelona', 'This Spanish city is a feast for the eyes: Visitors can walk past medieval architecture in the Barri Gòtic, snap photos of the intricate Basílica de la Sagrada Família and marvel at more of Antoni Gaudí\'s whimsical creations in Park Güell. ', '2024-05-31', '2024-07-29', 8000, '7b488694-c2a8-40c5-a6d3-36a5c5c255f8.jpeg'),
('00bf27a2-184c-11ef-a3aa-8c1759fce107', 'St. Lucia', 'Dotted with luxurious boutique hotels and stunning mountainside resorts, this Caribbean destination is ideal for lovebirds and adrenaline junkies. ', '2024-05-02', '2024-05-28', 5000, '8ff853eb-ddf7-4e5e-b875-5812a1c71b21.jpeg'),
('00bf3a1b-184c-11ef-a3aa-8c1759fce107', 'Sydney', 'Sydney offers more than just a dizzying array of famous landmarks, such as the Sydney Opera House, Mrs. Macquarie\'s Chair and the Sydney Harbour Bridge. This Australia metropolis boasts a warm, sunny climate that is ideal for relaxing or surfing at world-', '2024-07-24', '2024-07-30', 2500, '0260f9b3-2da6-48b2-ac48-5aaa09133567.jpeg'),
('00bf5270-184c-11ef-a3aa-8c1759fce107', 'Dubai', 'Stunning Persian Gulf views, heart-pumping activities and historical landmarks await you in Dubai. This Middle Eastern city is filled with some of the world\'s most notable and unique attractions, including the Dubai Mall, indoor Ski Dubai and Burj Khalifa', '2024-05-27', '2024-06-15', 6700, 'eb74dc1f-79e0-4d2f-8796-0a98b35ff33b.jpeg'),
('00bf6413-184c-11ef-a3aa-8c1759fce107', 'New York City', 'New York City hosts infinite urban adventures: You can wander through Central Park, tour art exhibits at The Metropolitan Museum of Art, catch a classic New York Broadway show or peruse SoHo\'s stylish boutiques. ', '2024-04-22', '2025-04-22', 7500, '5dc64c37-3d38-4e72-a5b3-dedcfa01f19f.jpeg'),
('00bf75bc-184c-11ef-a3aa-8c1759fce107', 'Santorini', 'Frequently touted as a top honeymoon destination, Greece\'s most popular isle woos newlyweds every year with its breathtaking sunsets, whitewashed villages and colorful beaches. Archaeological sites, such as Ancient Thira and the prehistoric Akrotiri, beck', '2024-12-16', '2024-12-16', 6200, '9bbd4cbb-119f-428d-9216-54e3cd402dce.jpeg'),
('028c8b66-1836-11ef-a3aa-8c1759fce107', 'Turks', 'Located north of the Dominican Republic, this collection of roughly 100 islands and cays is popular with honeymooners – and for good reason. With sparkling white sand, crystal-clear water and nearly 350 miles of colorful coral reef, the Turks and Caicos I', '2025-05-03', '2025-05-10', 3700, '8bd90151-f0b5-478b-8c16-d37b01bc566a.jpeg'),
('028ca9c6-1836-11ef-a3aa-8c1759fce107', 'Tokyo', 'Simply setting foot in Japan\'s frenetic capital city is an experience. Known for its bustling streets and flashing neon signs, Tokyo has an electric energy and ample top attractions to discover. Foodies won\'t be let down by Tokyo\'s fresh sushi and hearty ', '2024-11-02', '2024-11-29', 7800, '0e83658e-04ca-4501-894c-e2991dc985a7.jpeg'),
('2d1fb6b9-b623-4d94-aaf2-481929a27c06', 'paris', 'France\'s magnetic City of Light is a perennial tourist destination, drawing visitors with its iconic attractions, like the Eiffel Tower and the Louvre.', '2023-05-25', '2025-05-29', 4000, '2320870f-12fc-42a2-b08b-243567f31bd2.jpeg'),
('567c075c-1835-11ef-a3aa-8c1759fce107', 'London', 'London is a world unto itself. The eclectic neighborhoods, which are home to a blend of historical landmarks and modern-day attractions, can keep you occupied for days. If it\'s your first time in London, join a tour that takes you past top spots like the ', '2024-10-31', '2024-10-14', 9500, '1c314aab-ea3a-4475-838e-4d504f304c5f.jpeg'),
('567c30ce-1835-11ef-a3aa-8c1759fce107', 'Maldives', 'It is not cheap or easy to reach, but this isolated Indian Ocean vacation spot located southwest of India is the personification of a dreamy tropical retreat. In this remote destination, which is made up of more than 1,000 islands, thatched-roof overwater', '2025-02-01', '2025-03-01', 12000, 'ff248f24-f493-4597-a878-f07439b4f914.jpeg'),
('8d1a8b34-1836-11ef-a3aa-8c1759fce107', 'Phuket', 'Located in southern Thailand, the island of Phuket offers something for everyone, especially budget-minded travelers. Activities like spa treatments and boat tours come with low price tags, as do accommodations, making this a cheap tropical vacation optio', '2025-02-08', '2025-02-27', 3600, '31bd92c5-4fb6-4017-806f-bc6e961a95fd.jpeg'),
('8d1aa4c1-1836-11ef-a3aa-8c1759fce107', 'Costa Rica', 'From volcanic mountains and verdant rainforests to tumbling waterfalls and miles of stunning shoreline, Costa Rica is a Central American gem. Explore the beaches along the Nicoya Peninsula, hike along Arenal Volcano and spot exotic wildlife (think: river ', '2024-12-10', '2024-12-24', 6200, '6d39c547-8332-47c8-8f9c-a0a19d719c62.jpeg'),
('c958fe02-1849-11ef-a3aa-8c1759fce107', 'New Zealand', 'New Zealand\'s South Island brims with majestic landscapes at every turn, from dramatic mountains to spectacular fjords. Here, you can admire the mountains of Fiordland National Park from hiking trails or a boat on Milford Sound/Piopiotahi. ', '2025-02-16', '2025-02-23', 3900, '2518416c-b7be-4e85-8d72-35aec2195702.jpeg'),
('c95916d5-1849-11ef-a3aa-8c1759fce107', 'Tahiti', 'Travel to this island – the largest in French Polynesia – if you\'ve been dreaming of a vacation spent lazing in a lavish overwater bungalow combined with experiencing an ancient culture. Beyond the posh resorts, Tahiti boasts black sand and golden beaches', '2024-10-10', '2024-10-29', 7300, '6fe13178-37f2-405d-a9c9-95633173f719.jpeg'),
('d7d04fb2-1834-11ef-a3aa-8c1759fce107', 'Rome', 'When you visit Italy\'s capital city, prepare to cross a few must-see landmarks – including the Colosseum, the Trevi Fountain and the Pantheon – off of your bucket list. Travelers can also see some of Italy\'s greatest treasures, including St. Peter\'s Basil', '2024-04-30', '2024-05-17', 2400, '43423e2f-6f4f-4bbc-8507-cff3712b5c9e.jpeg'),
('d7d07b2a-1834-11ef-a3aa-8c1759fce107', 'Swiss Alps', 'Snow-covered mountains, charming towns and flower-strewn meadows make the Swiss Alps a year-round fairy tale destination. Visit in the winter for world-class skiing (and après-ski fondue and drinks) in locales such as the exclusive St. Moritz and the pict', '2024-06-30', '2024-07-19', 10500, 'dac6d6ca-5543-45a9-8acb-f462e51f7edf.jpeg'),
('d7d08f50-1834-11ef-a3aa-8c1759fce107', 'Maui', 'Whether you\'re driving along the Road to Hana, enjoying a bird\'s-eye view of Maui\'s lush coastline from a helicopter, snorkeling with sea turtles or simply relaxing on white or black sand beaches, you\'ll find that this Hawaiian island is unlike any other ', '2024-09-03', '2024-09-11', 1800, '53b20605-4b97-47a8-a62c-86bf02360ae4.jpeg'),
('deda65e7-1830-11ef-a3aa-8c1759fce107', 'Bora bora', 'What this 12-square-mile French Polynesian island may lack in size it makes up for in sheer tropical beauty. Here, you\'ll find picturesque beaches, lush jungles and luxurious resorts set on surrounding islets.', '2024-05-11', '2024-05-22', 4500, '91527641-5ae7-42f8-8450-097d17c82204.jpeg'),
('deda91df-1830-11ef-a3aa-8c1759fce107', 'Glacier National Park', 'Snow-capped peaks, alpine meadows and azure lakes are just a few reasons why Glacier National Park is one of America\'s most striking parks. There are more than 700 miles of hiking trails in this Montana crown jewel, plus 13 designated areas for camping.', '2024-05-30', '2024-06-10', 6500, '0114e54f-6bc1-4778-8dc5-7fe53f7fff6b.jpeg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
