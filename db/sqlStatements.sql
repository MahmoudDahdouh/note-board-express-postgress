-- Create database
CREATE DATABASE note_board;

-- Create tables
-- # user
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_type INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- # category
CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    FOREIGN KEY(id) REFERENCES users(id)
);

-- # note
CREATE TABLE note(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    is_checked BOOLEAN DEFAULT false,
    is_private BOOLEAN DEFAULT false,
    FOREIGN KEY(id) REFERENCES users(id),
    FOREIGN KEY(id) REFERENCES category(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- # tag
CREATE TABLE tag(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- # note tag
CREATE TABLE note_tag(
    id SERIAL PRIMARY KEY,
    FOREIGN KEY(id) REFERENCES tag(id),
    FOREIGN KEY(id) REFERENCES note(id)
);