-- Migration: Create notifications and social shares tables

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Social shares table
CREATE TABLE IF NOT EXISTS social_shares (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  routine_id INT,
  platform VARCHAR(50) NOT NULL,
  share_type VARCHAR(50) DEFAULT 'routine',
  message TEXT,
  shared_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (routine_id) REFERENCES routines(id) ON DELETE SET NULL
);

-- Index for faster queries
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_social_shares_user ON social_shares(user_id);
