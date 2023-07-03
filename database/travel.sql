-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: travel
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_code` int NOT NULL,
  `vacation_code` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_code` (`user_code`),
  KEY `vacation_code` (`vacation_code`),
  CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`user_code`) REFERENCES `users` (`user_code`),
  CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacation_code`) REFERENCES `vacations` (`vacation_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_code` int NOT NULL AUTO_INCREMENT,
  `private_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `likedVacations` json DEFAULT (json_array()),
  PRIMARY KEY (`user_code`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'noam','reiss','noam@hhh','12345678',1,'[]'),(2,'ido','reiss','ido@hhh','121212',1,'[]'),(3,'nono','jjj','nono@hhh','123456',0,'[]'),(4,'adi','oren','adi@hhh','16099',0,'[]'),(5,'rotem','reiss','rrr@hhh','12345',0,'[]');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacation_code` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `price` int DEFAULT NULL,
  `file_img_name` varchar(1000) DEFAULT NULL,
  `likes` int DEFAULT '0',
  PRIMARY KEY (`vacation_code`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (46,'Greece ','welcome to Greece ','2023-06-27','2023-07-01',551,'1584890375564.jpg',0),(48,'Italy ','welcome to Italy ','2023-06-30','2023-07-08',578,'IMG_20190623_193752.jpg',0),(49,'Tel Aviv ','welcome to Tel Aviv','2023-06-29','2023-07-06',3000,'IMG_20190614_124354.jpg',0),(50,'Givat yoav','welcome to Givat yoav','2023-07-06','2023-07-20',200,'1559659417339.jpg',0),(51,'New York ','welcome to new york ','2023-07-06','2023-07-08',333,'IMG_20190703_125558.jpg',0),(52,'Kinnert','Kinnert ','2023-07-07','2023-07-10',222,'1561815671767.jpg',0),(53,'Maldives ','welcome to Maldives ','2023-08-10','2023-08-17',656,'1593447646193.jpg',0),(54,'Greece ','welcome to Greece ','2023-08-08','2023-08-16',577,'1561110857624.jpg',0),(55,'Cyprus ','welcome to Cyprus ','2023-06-29','2023-07-01',456,'IMG_20190618_160456.jpg',0),(56,'Italy ','welcome to Italy ','2023-07-01','2023-07-06',5678,'1567882980708.jpg',0),(57,'Israel ','welcome to Isreal ','2023-06-29','2023-07-08',458,'1604848049085.jpg',0);
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-27 13:46:51
