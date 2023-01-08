#DROP DATABASE popket;
CREATE DATABASE IF NOT EXISTS popket;

USE popket;

CREATE TABLE IF NOT EXISTS addresses(
        id INT AUTO_INCREMENT NOT NULL,
        via_type VARCHAR(25) NOT NULL, 
        via_name VARCHAR(50) NOT NULL, 
        via_number VARCHAR (25),
        additional_address VARCHAR (200),
        postal_code CHAR(5) NOT NULL,
        locality VARCHAR(50),
        province VARCHAR(50),
        country VARCHAR(50),
        PRIMARY KEY(id)
);
    
CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT NOT NULL,
        first_name VARCHAR(25) NOT NULL, 
        last_name VARCHAR(25) NOT NULL, 
        email VARCHAR (50) UNIQUE NOT NULL,
        phone VARCHAR(15),
        user_password VARCHAR(100) NOT NULL,
        fk_id_address INT,
        PRIMARY KEY(id),
        FOREIGN KEY (fk_id_address) REFERENCES addresses(id) ON DELETE SET NULL
    );
 
 CREATE TABLE IF NOT EXISTS spacers(
        id INT AUTO_INCREMENT NOT NULL,
        first_name VARCHAR(25) NOT NULL, 
        last_name VARCHAR(25) NOT NULL, 
        email VARCHAR (50) UNIQUE NOT NULL,
        phone VARCHAR(15),
        spacer_password VARCHAR(100) NOT NULL,
        fk_id_address INT,
        PRIMARY KEY(id),
        FOREIGN KEY (fk_id_address) REFERENCES addresses(id) ON DELETE SET NULL
);
 
CREATE TABLE IF NOT EXISTS spaces(
        id INT AUTO_INCREMENT NOT NULL,
        name_space VARCHAR(50) NOT NULL, 
        description VARCHAR(500), 
		state VARCHAR(6) DEFAULT "draft",
        fk_id_spacer INT,
        image VARCHAR(512),
        PRIMARY KEY(id),
        FOREIGN KEY (fk_id_spacer) REFERENCES spacers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS products(
        id INT AUTO_INCREMENT NOT NULL,
        product_name VARCHAR(50) NOT NULL, 
        description TEXT, 
        price FLOAT NOT NULL,
        image VARCHAR(512) NOT NULL,
        fk_id_space INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (fk_id_space) REFERENCES spaces(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders(
        id INT AUTO_INCREMENT NOT NULL,
        num_order VARCHAR(12) UNIQUE NOT NULL, 
        address VARCHAR(500) NOT NULL,
        order_date DATETIME DEFAULT now(),
        total_account VARCHAR(25) NOT NULL,
        state VARCHAR(25) NOT NULL,
        PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS orders_products(
        id INT AUTO_INCREMENT NOT NULL,
        quantity INT NOT NULL,
        fk_id_order INT NOT NULL,
        fk_id_product INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (fk_id_order) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (fk_id_product) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS users_spacers_orders(
        id INT AUTO_INCREMENT NOT NULL,
        id_user_spacer INT NOT NULL,
        fk_id_order INT NOT NULL,
        name_table VARCHAR(25) NOT NULL, 
        PRIMARY KEY(id),
        FOREIGN KEY (fk_id_order) REFERENCES orders(id)
);

CREATE TABLE IF NOT EXISTS orders_requests(
        id INT AUTO_INCREMENT NOT NULL,
        fk_id_order INT NOT NULL,
        fk_id_space INT NOT NULL,
        state VARCHAR(50) NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (fk_id_order) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (fk_id_space) REFERENCES spaces(id)
);


SELECT * FROM spaces