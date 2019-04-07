DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INTEGER(10) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("God of War","Video Game",60,10);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("Minecraft","Video Game",30,2);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("HDTV","Electronics",1000,5);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("Toaster","Electronics",50,15);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("Charlotte's Web","Book",20,9);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("Fahrenheit 451","Book",25,12);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("Couch","Furniture",1500,3);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("Table","Furniture",50,5);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("Grill","Outside",200,6);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("Lawn Mower","Outside",150,4);