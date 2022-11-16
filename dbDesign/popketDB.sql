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
        surname VARCHAR(25) NOT NULL, 
        email VARCHAR (25) NOT NULL,
        phone VARCHAR(15),
        fk_id_adress INT,
        PRIMARY KEY(id),
        FOREIGN KEY (address) REFERENCES addresses (id) ON DELETE SET NULL
    );

CREATE TABLE IF NOT EXISTS spacers(
        id INT AUTO_INCREMENT NOT NULL,
        first_name VARCHAR(25) NOT NULL, 
        surname VARCHAR(25) NOT NULL, 
        email VARCHAR (25) NOT NULL,
        phone VARCHAR(15),
        fk_id_address INT,
        fk_id_space INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (address) REFERENCES addresses (id) ON DELETE SET NULL
    );