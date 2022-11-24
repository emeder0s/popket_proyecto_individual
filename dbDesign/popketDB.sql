#DROP DATABASE popket;
CREATE DATABASE IF NOT EXISTS popket;

USE popket;

CREATE TABLE IF NOT EXISTS addresses(
        id INT AUTO_INCREMENT NOT NULL,
        via_type VARCHAR(25) NOT NULL, 
        via_name VARCHAR(50) NOT NULL, 
        via_number VARCHAR (25) NOT NULL,
        more_info VARCHAR (25) NOT NULL,
        postal_code CHAR(5),
        locality VARCHAR(25),
        PRIMARY KEY(id)
    );
    
CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT NOT NULL,
        first_name VARCHAR(25) NOT NULL, 
        last_name VARCHAR(25) NOT NULL, 
        email VARCHAR (25) UNIQUE NOT NULL,
        phone VARCHAR(15),
        fk_id_address INT,
        PRIMARY KEY(id),
        FOREIGN KEY (fk_id_address) REFERENCES addresses(id) ON DELETE SET NULL
    );
    
CREATE TABLE IF NOT EXISTS spaces(
        id INT AUTO_INCREMENT NOT NULL,
        name_space VARCHAR(50) NOT NULL, 
        description VARCHAR(500), 
		state VARCHAR(6) DEFAULT "draft",
        PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS spacers(
        id INT AUTO_INCREMENT NOT NULL,
        first_name VARCHAR(25) NOT NULL, 
        last_name VARCHAR(25) NOT NULL, 
        email VARCHAR (25) UNIQUE NOT NULL,
        phone VARCHAR(15),
        fk_id_address INT,
        fk_id_space INT,
        PRIMARY KEY(id),
        FOREIGN KEY (fk_id_address) REFERENCES addresses(id) ON DELETE SET NULL,
        FOREIGN KEY (fk_id_space) REFERENCES spaces(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS products(
        id INT AUTO_INCREMENT NOT NULL,
        product_name VARCHAR(50) NOT NULL, 
        description VARCHAR(500), 
        price VARCHAR (25) NOT NULL,
        image VARCHAR(512) NOT NULL,
        fk_id_space INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (fk_id_space) REFERENCES spaces(id)
);

CREATE TABLE IF NOT EXISTS orders(
        id INT AUTO_INCREMENT NOT NULL,
        total_account VARCHAR(25) NOT NULL, 
        num_order VARCHAR(12) NOT NULL, 
        pick_up_adddress VARCHAR(300), 
        address VARCHAR(500),
        PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS orders_products(
        id INT AUTO_INCREMENT NOT NULL,
        quantity INT NOT NULL,
        fk_id_order INT NOT NULL,
        fk_id_product INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (fk_id_order) REFERENCES orders(id),
        FOREIGN KEY (fk_id_order) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS users_spacers_orders(
        id INT AUTO_INCREMENT NOT NULL,
        name_table VARCHAR(25) NOT NULL, 
        id_user_spacer INT NOT NULL,
        fk_id_order INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (fk_id_order) REFERENCES orders(id)
);