DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

use bamazon;

CREATE TABLE products (
    id INT(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity VARCHAR (10) null,
    product_sales DECIMAL(10,2) null,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Tide Pods", "Household", 20, 100, 0), 
("AA Batteries", "Electronics", 10, 5, 0), 
("Coffee", "Food", 15, 1, 0), 
("Desk", "Furniture", 200, 10, 0), 
("Dog Food", "Pets", 50, 20, 0),
("Cat Food", "Pets", 30, 30, 0),
("Desk Chair", "Furniture", 400, 2, 0),
("Pants", "Apparel", 10, 1000, 0),
("Soap", "Household", 5, 100, 0),
("Bread", "Food", 5, 20, 0);


CREATE TABLE departments (
    department_id INT(10) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(100) NULL,
    over_head_costs DECIMAL(10,2) null,
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Household", 2.5),
("Electronics", 11),
("Food", 0.5),
("Furniture", 100),
("Pets", 9),
("Apparel", 2);