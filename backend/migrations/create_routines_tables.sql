-- 1. Exercises table (must be created first)
CREATE TABLE IF NOT EXISTS exercises (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  muscle_group VARCHAR(100),
  equipment VARCHAR(100),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Folders table for organizing routines
CREATE TABLE IF NOT EXISTS routine_folders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Routines table
CREATE TABLE IF NOT EXISTS routines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  folder_id INT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (folder_id) REFERENCES routine_folders(id) ON DELETE SET NULL
);

-- 4. Routine exercises junction table (created last since it references both routines and exercises)
CREATE TABLE IF NOT EXISTS routine_exercises (
  id INT AUTO_INCREMENT PRIMARY KEY,
  routine_id INT NOT NULL,
  exercise_id INT NOT NULL,
  exercise_order INT DEFAULT 0,
  sets INT DEFAULT 3,
  reps INT DEFAULT 10,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (routine_id) REFERENCES routines(id) ON DELETE CASCADE,
  FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
);

-- 5. Sample exercises data with images
INSERT INTO exercises (name, muscle_group, equipment, image_url) VALUES
('Bench Press', 'Chest', 'Barbell', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200'),
('Squat', 'Legs', 'Barbell', 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=200'),
('Deadlift', 'Back', 'Barbell', 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=200'),
('Pull Up', 'Back', 'Bodyweight', 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=200'),
('Push Up', 'Chest', 'Bodyweight', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200'),
('Shoulder Press', 'Shoulders', 'Dumbbell', 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=200'),
('Bicep Curl', 'Arms', 'Dumbbell', 'https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=200'),
('Tricep Dip', 'Arms', 'Bodyweight', 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?w=200'),
('Leg Press', 'Legs', 'Machine', 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=200'),
('Lat Pulldown', 'Back', 'Cable', 'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=200'),
('Lunges', 'Legs', 'Bodyweight', 'https://images.unsplash.com/photo-1609899464926-209d2f0ad50e?w=200'),
('Plank', 'Core', 'Bodyweight', 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=200'),
('Russian Twist', 'Core', 'Bodyweight', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200'),
('Calf Raise', 'Legs', 'Machine', 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=200'),
('Face Pull', 'Shoulders', 'Cable', 'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=200');
