-- Migration: Add role column to users table
-- This implements the UML class hierarchy where User can be Member or Admin

-- Add role column if it doesn't exist
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'Member';

-- Add status column if it doesn't exist (for user management)
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'Active';

-- Add created_at column if it doesn't exist
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Update existing users without a role to be 'Member'
UPDATE users SET role = 'Member' WHERE role IS NULL OR role = '';

-- Note: MySQL doesn't support CHECK constraints well in older versions
-- The application layer will enforce 'Member' or 'Admin' values
