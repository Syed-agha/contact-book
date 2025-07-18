CREATE DATABASE contactbook;

USE contactbook;

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(100)
);
