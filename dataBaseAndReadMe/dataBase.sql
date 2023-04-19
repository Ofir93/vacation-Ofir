CREATE DATABASE  IF NOT EXISTS `tripping` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tripping`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: tripping
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'admin','$2a$04$G.dhRnmJ3Z4m2cK09qBwhujmFZ9vQz3XjxT9vvgspy1HGgBCYAngG');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `user` int NOT NULL,
  `vacation` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1,1),(2,1),(2,2),(3,1),(3,2),(3,8),(8,7),(8,11),(9,1),(9,8),(9,11),(9,2),(9,9),(9,7),(10,2),(10,11);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ofir','by','Bliz','$2a$10$raCK3odw4QpXdvwMvCaW8.nYCXL04M5FMDuNXjn4qd9tEeae02Lbe'),(2,'Ofir2','by2','Bliz2','$2a$10$4mnDKXA1VbwRqTvxotSuYO05zwJ3/0YvQXjGckaNt16SE2joH/boS'),(3,'Ofir3','by3','Bliz3','$2a$10$5dp/EYMy32VupHwhxl8MJ.OPRdTeWbUeqt6e3IgYbdrFVKgsAPzqu'),(4,'Ofir2','by2','bliz2','$2a$10$rvxviKWBbiDHF4WOcmvlReXckjthgKCJimUg.SLMh/UlqrMxEBAU2'),(5,'tevel','mor','Teveli','$2a$10$YCrRyJP5VPSQTX7lagxQa.g.C0wCeGYA588eJa4aOn1gOI1GrS95u'),(6,'we','qwer','123qw','$2a$10$wwSVQFu8HItyPBR6F9v6t.PFx0lMrHAuAV.QwbfLQ2i4r7KtpPZju'),(7,'Ofir','mor','Teveli2','$2a$10$cwtjPVx12ucHxJU/ata0eOXC/s7dy4YR5tWPoAfVZuzmajMwJlj8y'),(8,'Ofir','mor','Teveli5','$2a$10$937w6hB42Ta5ZVqwjZHOz.S6RP6cZKnObJYXL19LKVUI20FY7Wqee'),(9,'tevel','mor','Teveli6','$2a$10$6e/IcEJoKf/rxzfwbXEtbuHZ9bB3KpMZkDraD07D5urb1sHvVZB/q'),(10,'yessie','arie','Yos','$2a$10$DMAOjE8bo3v8g03ChuxV4OFJnXXrVRbDTcdfpU6ORAyHnXfytfV/C');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `destination` varchar(45) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `price` int NOT NULL,
  `followers` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'nice and cheap','Budapest','https://images-prod.dazeddigital.com/2500/azure/dazed-prod/1260/6/1266176.jpeg','2023-03-15','2023-03-23',3000,4),(2,'Israel','Negev','https://qtxasset.com/quartz/qcloud5/media/image/GettyImages-485339209.jpg?VersionId=2NKpLBmEKHhVQAA3ilRAny9aVp_eRZxi','2025-02-25','2026-02-03',1000,4),(7,'222','negev','https://qtxasset.com/quartz/qcloud5/media/image/GettyImages-485339209.jpg?VersionId=2NKpLBmEKHhVQAA3ilRAny9aVp_eRZxi','2023-05-19','2023-05-26',19,2),(8,'wer','isr','https://qtxasset.com/quartz/qcloud5/media/image/GettyImages-485339209.jpg?VersionId=2NKpLBmEKHhVQAA3ilRAny9aVp_eRZxi','2023-03-30','2023-03-31',1,2),(9,'wer1','wer','https://qtxasset.com/quartz/qcloud5/media/image/GettyImages-485339209.jpg?VersionId=2NKpLBmEKHhVQAA3ilRAny9aVp_eRZxi','2023-03-28','2023-03-29',2,1),(11,'nice','Tel Aviv','https://i1.sndcdn.com/avatars-000037801095-8f8bfy-t500x500.jpg','2023-04-20','2023-04-21',2000,3);
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

-- Dump completed on 2023-04-19 21:05:19
