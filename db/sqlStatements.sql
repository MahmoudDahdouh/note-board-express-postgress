-- Create database
CREATE DATABASE note_board;
-- connect to database
\c note_board;

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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- # category
CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id)
);

-- # note
CREATE TABLE note(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT DEFAULT '',
    is_checked boolean DEFAULT FALSE,
    is_public boolean DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    category_id INT,
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_category_id FOREIGN KEY(category_id) REFERENCES category(id)
);


-- # tag
CREATE TABLE tag(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- # note tag
CREATE TABLE note_tag(
    id SERIAL PRIMARY KEY,
    tag_id INT NOT NULL,
    note_id INT NOT NULL,
    CONSTRAINT fk_tag_id FOREIGN KEY(tag_id) REFERENCES tag(id),
    CONSTRAINT fk_note_id FOREIGN KEY(note_id) REFERENCES note(id)
);