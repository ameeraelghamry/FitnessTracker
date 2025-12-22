-- ============================================
-- NOTIFICATIONS TABLE FOR FITNESS TRACKER
-- ============================================
-- Run this in your MySQL database to create the notifications table

CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type VARCHAR(50) DEFAULT 'general',
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    `read` BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
);

-- ============================================
-- SAMPLE NOTIFICATIONS (Optional)
-- ============================================
-- INSERT INTO notifications (user_id, type, title, message) VALUES
-- (1, 'workout_reminder', 'Workout Reminder', 'Time for your daily workout! Stay consistent! 💪'),
-- (1, 'achievement', 'New Achievement!', 'You completed 10 workouts this month! 🏆'),
-- (1, 'schedule', 'Upcoming Session', 'You have a workout scheduled for tomorrow at 9 AM');

-- ============================================
-- VERIFY TABLE CREATION
-- ============================================
DESCRIBE notifications;
