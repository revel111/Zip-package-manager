CREATE DATABASE IF NOT EXISTS zipManager;
USE zipManager;

CREATE TABLE IF NOT EXISTS users
(
    id                   INT AUTO_INCREMENT PRIMARY KEY,
    email                VARCHAR(255) NOT NULL,
    nickname             VARCHAR(255) NOT NULL,
    password             VARCHAR(255) NOT NULL,

    date_of_creation     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_of_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS types
(
    id                   INT AUTO_INCREMENT PRIMARY KEY,
    name                 VARCHAR(255) NOT NULL,

    date_of_creation     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_of_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS zips
(
    id                   INT AUTO_INCREMENT PRIMARY KEY,
    name                 VARCHAR(255) NOT NULL,
    user_id              INT          NOT NULL,
#         zip_file             LONGBLOB     NOT NULL,
    zip_file             LONGBLOB,
    file_name            VARCHAR(255) NOT NULL,

    date_of_creation     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_of_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS zip_types
(
    zip_id               INT NOT NULL,
    type_id              INT NOT NULL,

    date_of_creation     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_of_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (zip_id, type_id)
);

CREATE TABLE IF NOT EXISTS roles
(
    id                   INT AUTO_INCREMENT PRIMARY KEY,
    name                 VARCHAR(255) NOT NULL,

    date_of_creation     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_of_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users_roles
(
    user_id              INT NOT NULL,
    role_id              INT NOT NULL,

    date_of_creation     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_of_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS user_tokens
(
    user_id INT PRIMARY KEY,
    token   TEXT NOT NULL
);

INSERT INTO roles (name)
VALUES ('user'),
       ('admin');