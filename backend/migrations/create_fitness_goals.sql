-- Migration: Create fitness goals and workout reminders tables

-- Fitness goals table
CREATE TABLE IF NOT EXISTS fitness_goals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  target_date DATE,
  goal_type VARCHAR(50) DEFAULT 'general',
  target_value INT,
  current_value INT DEFAULT 0,
  unit VARCHAR(50),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Workout reminders table
CREATE TABLE IF NOT EXISTS workout_reminders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  routine_id INT,
  title VARCHAR(255) NOT NULL,
  reminder_time TIME NOT NULL,
  reminder_days VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (routine_id) REFERENCES routines(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX idx_goals_user ON fitness_goals(user_id, status);
CREATE INDEX idx_reminders_user ON workout_reminders(user_id, is_active);
