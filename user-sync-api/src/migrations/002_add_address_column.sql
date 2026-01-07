-- Migration: Add address column to users
-- Author: Developer Name
-- Date: 2026-01-06

ALTER TABLE users ADD COLUMN IF NOT EXISTS address TEXT AFTER website;
ALTER TABLE users ADD COLUMN IF NOT EXISTS company VARCHAR(255) AFTER address;

