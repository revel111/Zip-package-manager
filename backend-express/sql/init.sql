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
    description          VARCHAR(255) NOT NULL,
    user_id              INT          NOT NULL,
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

INSERT INTO types (name)
VALUES ('java'),
       ('idk'),
       ('c++'),
       ('c#'),
       ('photo'),
       ('unique');

INSERT INTO users (email, nickname, password)
VALUES ('shadow@gmail.com', 'shadowizard',
        '$2b$10$qhWyG5dqzvklZiYb/6e2juv5J3ANY/zSoHzmjjZfO7BsCDZM.Mtl2'),
       ('loco@gmail.com', 'loco',
        '$2b$10$qhWyG5dqzvklZiYb/6e2juv5J3ANY/zSoHzmjjZfO7BsCDZM.Mtl2');

INSERT INTO users_roles (user_id, role_id)
VALUES (1, 1),
       (1, 2),
       (2, 1);

INSERT INTO zips (name, description, user_id, file_name)
VALUES ('Adventure in the Cloud', 'A thrilling zip file packed with cloud-based data!', 1, 'adventure_cloud.zip'),
       ('Mystic Treasures', 'Discover the hidden gems in this ancient archive.', 1, 'mystic_treasures.zip'),
       ('Tech Revolution', 'All the tech files you need to stay ahead of the curve!', 2, 'tech_revolution.zip'),
       ('Galactic Quest', 'Embark on a space journey with this stellar collection of files.', 2, 'galactic_quest.zip'),
       ('Art of the Future', 'Experience the next generation of art through these digital files.', 1, 'art_future.zip'),
       ('Coded Wonders', 'A programmer’s dream with plenty of code and scripts to explore.', 1, 'coded_wonders.zip'),
       ('The Dreamscape', 'A surreal zip filled with abstract concepts and creative designs.', 2, 'dreamscape.zip'),
       ('Time Traveler’s Vault', 'Unlock the secrets of time travel with this vintage archive.', 2,
        'time_travel_vault.zip');

INSERT INTO zip_types (zip_id, type_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (1, 4),
       (2, 1),
       (4, 2),
       (4, 3);