-- Migration: Create users table
-- Author: Developer Name
-- Date: 2026-01-06

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    external_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    website VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_email (email)
);

-- Add any future alterations below:
-- ALTER TABLE users ADD COLUMN address TEXT;

