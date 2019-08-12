DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

use bamazon;

CREATE TABLE products (
    id INT(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity VARCHAR (10) null,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tide Pods", "Household", 20, 100), 
("AA Batteries", "Electronics", 10, 5), 
("Coffee", "Food", 15, 1), 
("Desk", "Furniture", 200, 10), 
("Dog Food", "Pets", 50, 20),
("Cat Food", "Pets", 30, 30),
("Desk Chair", "Furniture", 400, 2),
("Pants", "Apparel", 10, 1000),
("Soap", "Household", 5, 100),
("Bread", "Food", 5, 20);