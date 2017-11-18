DROP DATABASE IF EXISTS cake_db;
CREATE DATABASE cake_db;
USE cake_db;

CREATE TABLE cakes
(
id int NOT NULL AUTO_INCREMENT,
cakeName varchar(255) NOT NULL,
orders BOOLEAN DEFAULT false,
PRIMARY KEY (id)
);
