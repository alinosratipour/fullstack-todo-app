CREATE DATABASE perntodo;

CREATE TABLE todo(
todo_id SERIAL PRIMARY KEY,
description VARCHAR(255)

);

CREATE TABLE users(
id SERIAL PRIMARY KEY,
firstname VARCHAR(100),
lastname VARCHAR(120),
email  VARCHAR(255) NOT NULL UNIQUE,
password     VARCHAR(100) NOT NULL,
sign_up_date DATE NOT NULL DEFAULT CURRENT_DATE
);


CREATE TABLE todos
(
     todo_id SERIAL PRIMARY KEY,
     description     varchar(250) NOT NULL,
     users_id int NOT NULL  REFERENCES users(id),
     last_modified DATE NOT NULL DEFAULT CURRENT_DATE
    
);