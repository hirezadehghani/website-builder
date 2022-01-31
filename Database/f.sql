-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: websitebuilder
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `buy`
--

DROP TABLE IF EXISTS `buy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buy` (
  `ID` int NOT NULL,
  `date_purchased` date NOT NULL,
  `walletID` int NOT NULL,
  `subscriptionID` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `walletID` (`walletID`),
  KEY `subscriptionID` (`subscriptionID`),
  CONSTRAINT `buy_ibfk_1` FOREIGN KEY (`walletID`) REFERENCES `wallet` (`ID`),
  CONSTRAINT `buy_ibfk_2` FOREIGN KEY (`subscriptionID`) REFERENCES `subscription` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buy`
--

LOCK TABLES `buy` WRITE;
/*!40000 ALTER TABLE `buy` DISABLE KEYS */;
INSERT INTO `buy` VALUES (2,'1400-10-30',2,6),(10,'1400-10-20',1,50);
/*!40000 ALTER TABLE `buy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `ID` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'company'),(2,'personal'),(3,'bussnuis');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `ID` int NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL,
  `phone_number` varchar(11) CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL,
  `national_number` int NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL,
  `subscriptionID` int NOT NULL DEFAULT '1',
  `buyID` int NOT NULL DEFAULT '1',
  `customer_picture` varchar(255) COLLATE utf8_persian_ci DEFAULT 'default.png',
  PRIMARY KEY (`ID`),
  KEY `subscriptionID` (`subscriptionID`),
  KEY `buyID` (`buyID`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`subscriptionID`) REFERENCES `customer` (`ID`),
  CONSTRAINT `customer_ibfk_2` FOREIGN KEY (`buyID`) REFERENCES `buy` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (651,'hossein','mosavi','09200000000',1111111111,'az@gmail.com',1,1,NULL),(989,'ali','zare','09200000000',1111111110,'aa@gmail.com',1,1,NULL),(1091,'amir','mohammadi','09100000000',1111111111,'e@gmail.com',1,1,NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_template`
--

DROP TABLE IF EXISTS `customer_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_template` (
  `customerID` int NOT NULL,
  `templateID` int NOT NULL,
  KEY `customerID` (`customerID`),
  KEY `templateID` (`templateID`),
  CONSTRAINT `customer_template_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `customer` (`ID`),
  CONSTRAINT `customer_template_ibfk_2` FOREIGN KEY (`templateID`) REFERENCES `template` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_template`
--

LOCK TABLES `customer_template` WRITE;
/*!40000 ALTER TABLE `customer_template` DISABLE KEYS */;
INSERT INTO `customer_template` VALUES (651,1),(989,2);
/*!40000 ALTER TABLE `customer_template` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `ID` int NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone_number` varchar(11) NOT NULL,
  `national_code` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `type` int NOT NULL,
  `employee_picture` varchar(255) DEFAULT 'default.png',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Reza','Dehghani','09000000000','0975421232','hello.dehghani@gmail.com',1,NULL),(2,'AmirHossein','Zareian','09000000000','0974552232','no@gmail.com',1,NULL),(3,'Ali','Moghimi','09000540000','0975421232','no@gmail.com',2,NULL);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_faq`
--

DROP TABLE IF EXISTS `employee_faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_faq` (
  `employeeID` int NOT NULL,
  `faqID` int NOT NULL,
  KEY `employeeID` (`employeeID`),
  KEY `faqID` (`faqID`),
  CONSTRAINT `employee_faq_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`ID`),
  CONSTRAINT `employee_faq_ibfk_2` FOREIGN KEY (`faqID`) REFERENCES `faq` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_faq`
--

LOCK TABLES `employee_faq` WRITE;
/*!40000 ALTER TABLE `employee_faq` DISABLE KEYS */;
INSERT INTO `employee_faq` VALUES (1,1),(2,2);
/*!40000 ALTER TABLE `employee_faq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_subscription`
--

DROP TABLE IF EXISTS `employee_subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_subscription` (
  `employeeID` int NOT NULL,
  `subscriptionID` int NOT NULL,
  KEY `employeeID` (`employeeID`),
  KEY `subscriptionID` (`subscriptionID`),
  CONSTRAINT `employee_subscription_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`ID`),
  CONSTRAINT `employee_subscription_ibfk_2` FOREIGN KEY (`subscriptionID`) REFERENCES `subscription` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_subscription`
--

LOCK TABLES `employee_subscription` WRITE;
/*!40000 ALTER TABLE `employee_subscription` DISABLE KEYS */;
INSERT INTO `employee_subscription` VALUES (1,6),(2,50);
/*!40000 ALTER TABLE `employee_subscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_template`
--

DROP TABLE IF EXISTS `employee_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_template` (
  `employeeID` int DEFAULT NULL,
  `templateID` int DEFAULT NULL,
  KEY `employeeID` (`employeeID`),
  KEY `templateID` (`templateID`),
  CONSTRAINT `employee_template_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`ID`),
  CONSTRAINT `employee_template_ibfk_2` FOREIGN KEY (`templateID`) REFERENCES `template` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_template`
--

LOCK TABLES `employee_template` WRITE;
/*!40000 ALTER TABLE `employee_template` DISABLE KEYS */;
INSERT INTO `employee_template` VALUES (1,1),(2,3),(3,2);
/*!40000 ALTER TABLE `employee_template` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_transaction`
--

DROP TABLE IF EXISTS `employee_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_transaction` (
  `employeeID` int DEFAULT NULL,
  `transactionID` int DEFAULT NULL,
  KEY `employeeID` (`employeeID`),
  KEY `transactionID` (`transactionID`),
  CONSTRAINT `employee_transaction_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`ID`),
  CONSTRAINT `employee_transaction_ibfk_2` FOREIGN KEY (`transactionID`) REFERENCES `transaction` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_transaction`
--

LOCK TABLES `employee_transaction` WRITE;
/*!40000 ALTER TABLE `employee_transaction` DISABLE KEYS */;
INSERT INTO `employee_transaction` VALUES (1,1),(2,2),(3,3);
/*!40000 ALTER TABLE `employee_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq`
--

DROP TABLE IF EXISTS `faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faq` (
  `ID` int NOT NULL,
  `question` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq`
--

LOCK TABLES `faq` WRITE;
/*!40000 ALTER TABLE `faq` DISABLE KEYS */;
INSERT INTO `faq` VALUES (1,'How can I use multiple template at the same time','when you bought a subscription, you can use all templates base on subscription you bought'),(2,'How can I renew my subscription','you can renew it via panel -> subscription -> renew it');
/*!40000 ALTER TABLE `faq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `picture`
--

DROP TABLE IF EXISTS `picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `picture` (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_persian_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL,
  `templateID` int NOT NULL,
  KEY `templateID` (`templateID`),
  CONSTRAINT `picture_ibfk_1` FOREIGN KEY (`templateID`) REFERENCES `template` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `picture`
--

LOCK TABLES `picture` WRITE;
/*!40000 ALTER TABLE `picture` DISABLE KEYS */;
INSERT INTO `picture` VALUES ('personal','personal.jpg',1),('company','company.jpg',2),('bussnuis','bussnuis.jpg',2);
/*!40000 ALTER TABLE `picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reply`
--

DROP TABLE IF EXISTS `reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reply` (
  `ID` int NOT NULL,
  `answer` varchar(255) CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL,
  `date_answered` date NOT NULL,
  `ticketID` int NOT NULL,
  `employeeID` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ticketID` (`ticketID`),
  KEY `employeeID` (`employeeID`),
  CONSTRAINT `reply_ibfk_1` FOREIGN KEY (`ticketID`) REFERENCES `ticket` (`ID`),
  CONSTRAINT `reply_ibfk_2` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reply`
--

LOCK TABLES `reply` WRITE;
/*!40000 ALTER TABLE `reply` DISABLE KEYS */;
INSERT INTO `reply` VALUES (1,'you can buy subscription from your panel vial this link','1400-10-18',3,1),(2,'we showed you how to buy a domain with this video','1400-12-18',3,3),(3,'Please, try again now with new information instrucrion on your email ali201@gmail.com','1400-11-24',1,3);
/*!40000 ALTER TABLE `reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription`
--

DROP TABLE IF EXISTS `subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription` (
  `ID` int NOT NULL,
  `price` int NOT NULL,
  `date_expired` date NOT NULL,
  `discount_amount` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription`
--

LOCK TABLES `subscription` WRITE;
/*!40000 ALTER TABLE `subscription` DISABLE KEYS */;
INSERT INTO `subscription` VALUES (6,50000,'1400-11-30',10),(50,100000,'1400-11-20',0);
/*!40000 ALTER TABLE `subscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `template`
--

DROP TABLE IF EXISTS `template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `template` (
  `ID` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL,
  `date_create` date NOT NULL,
  `date_last_update` date NOT NULL DEFAULT '1947-09-09',
  `short_description` varchar(255) CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL,
  `categoryID` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `categoryID` (`categoryID`),
  CONSTRAINT `template_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `category` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `template`
--

LOCK TABLES `template` WRITE;
/*!40000 ALTER TABLE `template` DISABLE KEYS */;
INSERT INTO `template` VALUES (1,'company template','2022-01-09','2022-12-12','tes',1),(2,'personal template','2021-12-09','1947-09-09','برای تمامی اشخاصی که نیازمند یک سایت شخصی حرفه ای و زیبا هستند.',3),(3,'bussnuis template','2022-01-07','1947-09-09','این قالب تجاری است و تمام نیاز های شرکت ها را برای داشتن یک سایت عالی برآورده می کند',2);
/*!40000 ALTER TABLE `template` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `template_state`
--

DROP TABLE IF EXISTS `template_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `template_state` (
  `t_key` int NOT NULL,
  `t_value` int NOT NULL,
  `templateID` int NOT NULL,
  KEY `templateID` (`templateID`),
  CONSTRAINT `template_state_ibfk_1` FOREIGN KEY (`templateID`) REFERENCES `template` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `template_state`
--

LOCK TABLES `template_state` WRITE;
/*!40000 ALTER TABLE `template_state` DISABLE KEYS */;
/*!40000 ALTER TABLE `template_state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `ID` int NOT NULL,
  `subject` varchar(255) CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL,
  `state` int NOT NULL,
  `date_create` date NOT NULL,
  `date_updated` date DEFAULT NULL,
  `date_closed` date DEFAULT NULL,
  `customerID` int NOT NULL,
  `employeeID` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `customerID` (`customerID`),
  KEY `employeeID` (`employeeID`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `customer` (`ID`),
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (1,'unable to login','I can\'t login to my dashboard',0,'1400-10-16','1400-11-24',NULL,651,1),(2,'unable to buy new subscription','I can\'t buy new subscription please help',0,'1400-10-17','1400-10-18','1400-10-25',989,2),(3,'how can I buy domain?','I want to buy a domain for my template how I can do this?',0,'1400-12-18','1400-12-18','1400-10-25',1091,3);
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `ID` int NOT NULL,
  `date_create` date DEFAULT NULL,
  `price` int NOT NULL,
  `type` int NOT NULL,
  `status` int NOT NULL,
  `walletID` int NOT NULL,
  `customerID` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `walletID` (`walletID`),
  KEY `customerID` (`customerID`),
  CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`walletID`) REFERENCES `wallet` (`ID`),
  CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`customerID`) REFERENCES `customer` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,'2021-02-12',15640000,2,1,1,651),(2,'2020-02-12',15645000,1,3,2,989),(3,'2022-02-12',21150000,2,2,3,1091);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_state`
--

DROP TABLE IF EXISTS `transaction_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_state` (
  `tr_key` int NOT NULL,
  `tr_value` int NOT NULL,
  `transactionID` int NOT NULL,
  KEY `transactionID` (`transactionID`),
  CONSTRAINT `transaction_state_ibfk_1` FOREIGN KEY (`transactionID`) REFERENCES `transaction` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_state`
--

LOCK TABLES `transaction_state` WRITE;
/*!40000 ALTER TABLE `transaction_state` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction_state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet`
--

DROP TABLE IF EXISTS `wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet` (
  `ID` int NOT NULL,
  `inventory` int NOT NULL DEFAULT '0',
  `customerID` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `customerID` (`customerID`),
  CONSTRAINT `wallet_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `customer` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet`
--

LOCK TABLES `wallet` WRITE;
/*!40000 ALTER TABLE `wallet` DISABLE KEYS */;
INSERT INTO `wallet` VALUES (1,102000000,651),(2,200990000,989),(3,1900000,1091);
/*!40000 ALTER TABLE `wallet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-27 20:45:27
