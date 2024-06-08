-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: taiyongmedical
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
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateTime` datetime NOT NULL,
  `room` int NOT NULL,
  `status` enum('Запись назначена','Запись отменена','Прием завершен') NOT NULL,
  `clients_id` int NOT NULL,
  `doctors_id` int NOT NULL,
  `services_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_appointments_patients1_idx` (`clients_id`),
  KEY `fk_appointments_doctors1_idx` (`doctors_id`),
  KEY `fk_appointments_services1_idx` (`services_id`),
  CONSTRAINT `fk_appointments_doctors1` FOREIGN KEY (`doctors_id`) REFERENCES `doctors` (`id`),
  CONSTRAINT `fk_appointments_patients1` FOREIGN KEY (`clients_id`) REFERENCES `clients` (`id`),
  CONSTRAINT `fk_appointments_services1` FOREIGN KEY (`services_id`) REFERENCES `services` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,'2024-06-21 17:11:00',106,'Прием завершен',1,3,2),(2,'2024-06-15 00:00:00',112,'Прием завершен',1,1,1),(3,'2024-06-10 00:00:00',122,'Запись назначена',5,4,3),(4,'2024-06-20 13:00:00',105,'Прием завершен',5,1,10),(5,'2024-06-10 12:00:00',123,'Запись отменена',5,3,2),(6,'2024-06-14 13:00:00',123,'Запись назначена',5,3,4),(8,'2024-06-19 13:00:00',106,'Запись назначена',1,1,1),(9,'2024-06-05 07:00:00',115,'Запись назначена',2,2,2),(10,'2024-06-25 13:00:00',117,'Запись назначена',5,10,2);
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `surName` varchar(50) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `birthday` date NOT NULL,
  `gender` char(1) DEFAULT NULL,
  `phone` char(12) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Полищук','Антон','Александрович','2005-09-21','М','+79806261773','anton@yandex.ru','administrator'),(2,'Беспалов','Ярослав','Викторович','2008-02-06','М','+79307701773','yaroslav@yandex.ru','stafferMedical'),(5,'тест','тест','Александрович','2005-09-21','М','+79806261773','anton1@yandex.ru','hash'),(7,'Тестов','Тест','Тестович','2024-05-17',NULL,'+79007777777','klava@yandex.ru','klava343'),(8,'кмкаум','амвамвм','вамвамввм','2239-09-10',NULL,'+79007777777','djiwjd@yandex.ru','sdhed2we24234'),(9,'Клиент','клиент','клиент','2024-06-05',NULL,'+79007777777','klient@yandex.ru','klient77'),(10,'амуамумау','емемек','уамумукаму','2024-06-15',NULL,'+79007777777','test@yandex.ru','test2131'),(11,'Ярик','Ярик','Ярик','2008-02-06',NULL,'+79301860642','yarik@yandex.ru','yarik123'),(15,'кмукмук','вмукм','мукмукмукмку','2024-06-12',NULL,'+79996481971','testov@yandex.ru','testov123'),(16,'комп','комп','комп','2024-06-20',NULL,'+79007777777','komp@yandex.ru','komp123'),(17,'комп','комп','компудахтер','2024-06-21',NULL,'+79007777777','kompudachter@yandex.ru','kompudachter123'),(18,'мыш','мыш','мыш','2024-06-02',NULL,'+79007777777','mish@yandex.ru','mish923'),(19,'моник','моник','моник','2024-06-09',NULL,'+79007777997','monik@yandex.ru','monik123'),(20,'кукмукму','авпккуамку','укмукмум','2024-06-02',NULL,'+79007777997','abcdefg@yandex.ru','abcdefg123');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(45) NOT NULL,
  `position` varchar(45) NOT NULL,
  `work_experience_start_day` date NOT NULL,
  `phone` char(12) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone_UNIQUE` (`phone`),
  UNIQUE KEY `fullName_UNIQUE` (`fullName`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (1,'Иванов Иван Иванович','Ортопед','2010-05-15','12345678901','/images/doctors/1.png','ivan@yandex.ru','stafferMedical'),(2,'Петров Петр Петрович','Хирург','2012-07-20','12345678902','/images/doctors/2.png','petr@yandex.ru','stafferMedical'),(3,'Сидоров Сидор Сидорович','Травматолог','2011-03-11','12345678903','/images/doctors/3.png','sidor@yandex.ru','stafferMedical'),(4,'Кузнецов Алексей Алексеевич','Нейрохирург','2009-09-30','12345678904','/images/doctors/4.png','aleksey@yandex.ru','stafferMedical'),(5,'Михайлов Михаил Михайлович','Кардиолог','2013-01-21','12345678905','/images/doctors/5.png','mihan@yandex.ru','stafferMedical'),(6,'Федоров Федор Федорович','Пластический хирург','2014-11-25','12345678906','/images/doctors/1717783692260.jpg','fedor@yandex.ru','stafferMedical'),(8,'Алексеев Алексей Алексеевич','Офтальмолог','2017-06-14','+79007777777','/images/doctors/1717784352085.jpg','alekseev@example.com','stafferMedical'),(10,'Антонов Антон Антонович','Главный нейрохирург','2015-09-21','+79007177777','/images/doctors/1717785085845.jpg','antonov@yandex.ru','stafferMedical');
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subTitle` varchar(255) NOT NULL,
  `picture` varchar(155) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'Новое оборудование','Мы установили новое оборудование для улучшения качества протезирования.','/images/news/new.jpeg'),(2,'Открытие нового отделения в клинике: расширение возможностей для наших пациентов','Клиника протезирования объявляет о запуске нового отделения, где пациенты могут получить более широкий спектр услуг и индивидуальный подход.','/images/news/karta.jpg'),(3,'Новые технологии в деле реабилитации: клиника внедряет передовые методики для улучшения результатов лечения','Мы рады объявить о внедрении новейших технологий и методик реабилитации, которые помогут нашим пациентам достичь более эффективных результатов восстановления.','/images/news/innovation.jpg'),(4,'Новый этап сотрудничества: клиника Tai Yong Medical заключает партнерство с ведущими производителями протезов','Мы рады объявить о заключении стратегического партнерства с ведущими мировыми производителями протезов. Это партнерство позволит нам предоставлять нашим пациентам доступ к самым передовым технологиям и инновациям в области протезирования.','/images/news/newStep.png');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_name` varchar(100) NOT NULL,
  `price` decimal(10,2) unsigned NOT NULL,
  `count` int unsigned NOT NULL,
  `date` datetime NOT NULL,
  `status` enum('Создан','В пути','Получен','Отменен') NOT NULL,
  `doctors_id` int NOT NULL,
  `prosthetics_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_orders_doctors1_idx` (`doctors_id`),
  KEY `fk_orders_prosthetics1_idx` (`prosthetics_id`),
  CONSTRAINT `fk_orders_doctors1` FOREIGN KEY (`doctors_id`) REFERENCES `doctors` (`id`),
  CONSTRAINT `fk_orders_prosthetics1` FOREIGN KEY (`prosthetics_id`) REFERENCES `prosthetics` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'Кибернетический имплантат ноги: \"PowerStride Plus\"',29000.00,1,'2024-06-07 00:00:00','Создан',1,7),(2,'Кибернетический протез глаза: \"Cognitive interface prosthesis system\"',27000.00,1,'2024-06-07 00:00:00','Создан',1,1),(3,'Кибернетический протез кисти: \"Isoiay\"',12000.00,4,'2024-06-07 00:00:00','Создан',3,3);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patienthistory`
--

DROP TABLE IF EXISTS `patienthistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patienthistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `state` varchar(45) NOT NULL,
  `clients_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_patientHistory_patients1_idx` (`clients_id`),
  CONSTRAINT `fk_patientHistory_patients1` FOREIGN KEY (`clients_id`) REFERENCES `clients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patienthistory`
--

LOCK TABLES `patienthistory` WRITE;
/*!40000 ALTER TABLE `patienthistory` DISABLE KEYS */;
INSERT INTO `patienthistory` VALUES (1,'описание','2024-04-04','отл',2);
/*!40000 ALTER TABLE `patienthistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prosthetics`
--

DROP TABLE IF EXISTS `prosthetics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prosthetics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `manufacturer` varchar(45) NOT NULL,
  `price` decimal(10,2) unsigned NOT NULL,
  `count` int unsigned DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prosthetics`
--

LOCK TABLES `prosthetics` WRITE;
/*!40000 ALTER TABLE `prosthetics` DISABLE KEYS */;
INSERT INTO `prosthetics` VALUES (1,'Кибернетический протез глаза: \"Cognitive interface prosthesis system\"','Sarif Industries',27000.00,9,'Аугментация глаз для улучшения зрения и ночного видения.','/images/prosthetics/eye.jpg'),(2,'Кибернетический мозговой чип: \"Computer-Assisted Social Interaction Enchanced (C.A.S.I.E.)\"','Tai Yong Medical',17000.00,6,'Инновационный мозговой чип, способствующий улучшению когнитивных функций и оптимизации работы мозга.','/images/prosthetics/brain.webp'),(3,'Кибернетический протез кисти: \"Isoiay\"','VersaLife',12000.00,2,'Протез \"Isoiay\" обеспечивает точное и естественное движение кисти, позволяя пациенту вернуться к повседневным делам с комфортом и уверенностью.','/images/prosthetics/hand.jpg'),(4,'Аугментированный интеллектуальный нейроинтерфейс: \"SmartVision X4\"','Sarif Industries',34000.00,3,'Расширяет обзор и улучшает понимание окружающего мира.','/images/prosthetics/tym1.jpg'),(5,'Кибернетическая кожа: \"DermaFlex Mk.IV\"','Picus Group',25000.00,4,'Предоставляет высокий уровень защиты и улучшает чувствительность кожи.','/images/prosthetics/tym1.jpg'),(6,'Нейро-сетевой интерфейс: \"NeuralLink Pro\"','VersaLife',38000.00,7,'Обеспечивает прямое взаимодействие между мозгом и технологическими устройствами.','/images/prosthetics/brain.png'),(7,'Кибернетический имплантат ноги: \"PowerStride Plus\"','LIMB International',29000.00,1,'Повышает скорость и маневренность при движении.','/images/prosthetics/leg.png'),(8,'Микро-нейроинтерфейс: \"NeuroLink Nano\"','Tai Yong Medical',41000.00,4,'Миниатюрный имплантат, улучшающий память и когнитивные способности.','/images/prosthetics/tym1.jpg'),(9,'Бионическая рука: \"TitanArm Mk.II\"','Sarif Industries',36000.00,5,'Обеспечивает силу и гибкость в повседневных задачах и экстремальных условиях.','/images/prosthetics/arm.jpg'),(10,'Кибернетический слуховой аппарат: \"AudioEnhance Bionic Ear\"','Picus Group',31000.00,8,'Улучшает слух и фильтрует внешние звуки для комфортного восприятия окружающего мира.','/images/prosthetics/audio.webp');
/*!40000 ALTER TABLE `prosthetics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(10,2) unsigned NOT NULL,
  `required_documents` varchar(255) NOT NULL,
  `doctors_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_services_doctors1_idx` (`doctors_id`),
  CONSTRAINT `fk_services_doctors1` FOREIGN KEY (`doctors_id`) REFERENCES `doctors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Установка киберпротеза \"Синергия\" с консультацией врача-протезиста.','Сложная операция по установке киберпротеза с последующими консультациями по эксплуатации и реабилитации.',15000.00,'Удостоверение личности, медицинская карта',1),(2,'Процедура аугментации глаз \"Соколиный Взгляд\" с диагностикой и контрольными обследованиями.','Процедура аугментации глаз с использованием передовых технологий и контролями для обеспечения оптимального результата.',20000.00,'Удостоверение личности, медицинская карта',2),(3,'Наноимплантация мозгового чипа \"Computer-Assisted Social Interaction Enchanced (C.A.S.I.E.)\" с последующим реабилитационным курсом.','Хирургическая процедура установки наноимпланта для улучшения социального взаимодействия, с последующим реабилитационным курсом.',25000.00,'Удостоверение личности, медицинская карта',3),(4,'Установка кибернетического протеза кисти \"Isoiay\" с реабилитационными процедурами.','Операция по установке кибернетического протеза для восстановления функциональности кисти с последующим реабилитационным курсом.',12000.00,'Удостоверение личности, медицинская карта',4),(5,'Аугментация глаз \"Кибернетический протез глаза: \"Cognitive interface prosthesis system\"\" с комплексным медицинским обследованием и дополнительными настройками.','Услуга по аугментации глаз с использованием передовых технологий и индивидуальным подбором параметров для максимального комфорта.',18000.00,'Удостоверение личности, медицинская карта',5),(6,'Наноимплантация \"Серебряный Орел\" с индивидуальной подборкой протеза и послепроцедурным обслуживанием.','Хирургическая процедура установки наноимпланта с индивидуальным подбором протеза и дальнейшим техническим обслуживанием.',22000.00,'Удостоверение личности, медицинская карта',6),(8,'Аугментация конечности \"Титановый Рукав\" с индивидуальным планированием и реабилитацией.','Комплексная процедура аугментации конечности с индивидуальным планированием и последующей реабилитацией.',18000.00,'Удостоверение личности, медицинская карта',1),(9,'Наноимплантация спинного мозга \"Нейросеть: Интеллектуальная Доска\" с комплексным нейрологическим обследованием.','Хирургическая процедура установки наноимпланта для улучшения работы спинного мозга с последующим комплексным нейрологическим обследованием.',25000.00,'Удостоверение личности, медицинская карта',2),(10,'Установка кибернетического протеза сердца \"Синтетический Эндокринный Сердечный Агрегат\" с последующим мониторингом состояния и дистанционным управлением.','Хирургическая процедура установки кибернетического протеза сердца с последующим мониторингом и управлением через сеть.',30000.00,'Удостоверение личности, медицинская карта',3);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services_reports`
--

DROP TABLE IF EXISTS `services_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services_reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `services` varchar(100) NOT NULL,
  `notes` varchar(255) NOT NULL,
  `doctors_id` int NOT NULL,
  `services_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reports_doctors1_idx` (`doctors_id`),
  KEY `fk_services_reports_services1_idx` (`services_id`),
  CONSTRAINT `fk_reports_doctors1` FOREIGN KEY (`doctors_id`) REFERENCES `doctors` (`id`),
  CONSTRAINT `fk_services_reports_services1` FOREIGN KEY (`services_id`) REFERENCES `services` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services_reports`
--

LOCK TABLES `services_reports` WRITE;
/*!40000 ALTER TABLE `services_reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `services_reports` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-08  8:04:52
