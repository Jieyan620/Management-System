DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  departmentid INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  departmentname VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE employeerole (
  roleid INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary INT,
  departmentid INT NOT NULL,
  FOREIGN KEY (departmentid) REFERENCES department(departmentid)
);

CREATE TABLE employees (
  employeeid INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roleid INT NOT NULL,
  FOREIGN KEY (roleid) REFERENCES emploryeerole(roleid),
  manager_id INT
);
