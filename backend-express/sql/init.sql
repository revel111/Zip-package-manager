CREATE TABLE users
(
    id       INT AUTO_INCREMENT PRIMARY KEY,
    email    VARCHAR(255) NOT NULL,
    nickname VARCHAR(255) NOT NULL
);

CREATE TABLE zip_types
(
    id               INT AUTO_INCREMENT PRIMARY KEY,
    name             VARCHAR(255) NOT NULL,
    date_of_creation DATE DEFAULT CURRENT_DATE
);

CREATE TABLE zips
(
    id               INT AUTO_INCREMENT PRIMARY KEY,
    name             VARCHAR(255) NOT NULL,
    zip_type_id      INT,
    user_id          INT,
    date_of_creation DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (zip_type_id) REFERENCES zip_types (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);