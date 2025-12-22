-- ============================================
-- SOCIAL SHARES & USER STATS TABLES
-- ============================================
-- Run this in your MySQL database

-- Social Shares Table - Tracks all share actions
CREATE TABLE IF NOT EXISTS social_shares (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    platform VARCHAR(50) NOT NULL,  -- facebook, twitter, whatsapp, linkedin, copy
    content_type VARCHAR(50) DEFAULT 'progress',  -- progress, streak, achievement, workout, invite
    content_id INT DEFAULT NULL,  -- Optional: ID of specific workout/achievement shared
    shared_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_platform (platform),
    INDEX idx_shared_at (shared_at)
);

-- User Stats Table - Stores aggregated user statistics for sharing
CREATE TABLE IF NOT EXISTS user_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    total_workouts INT DEFAULT 0,
    total_volume DECIMAL(10,2) DEFAULT 0,  -- in kg
    total_duration INT DEFAULT 0,  -- in minutes
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    last_workout_date DATE DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- INSERT SAMPLE DATA (Optional)
-- ============================================

-- Insert sample user stats for existing users
INSERT IGNORE INTO user_stats (user_id, total_workouts, total_volume, total_duration, current_streak, longest_streak)
SELECT id, 
       FLOOR(RAND() * 50) + 5,  -- 5-55 workouts
       FLOOR(RAND() * 50000) + 5000,  -- 5000-55000 kg volume
       FLOOR(RAND() * 3000) + 300,  -- 300-3300 minutes
       FLOOR(RAND() * 14) + 1,  -- 1-15 day streak
       FLOOR(RAND() * 30) + 5  -- 5-35 day longest streak
FROM users;

-- ============================================
-- VERIFY TABLES
-- ============================================
DESCRIBE social_shares;
DESCRIBE user_stats;

-- ============================================
-- SAMPLE QUERIES
-- ============================================

-- Get share count by platform
-- SELECT platform, COUNT(*) as count FROM social_shares GROUP BY platform;

-- Get user's total shares
-- SELECT user_id, COUNT(*) as total_shares FROM social_shares GROUP BY user_id;

-- Get most active sharers
-- SELECT u.username, COUNT(s.id) as shares 
-- FROM users u 
-- LEFT JOIN social_shares s ON u.id = s.user_id 
-- GROUP BY u.id 
-- ORDER BY shares DESC 
-- LIMIT 10;
