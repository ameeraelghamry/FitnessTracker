import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Questionnaire from "../models/Questionnaire.js";

class AuthService {
  // Normalize role to "Member" or "Admin"
  normalizeRole(role) {
    if (!role) return "Member";
    const normalized = role.toString().toLowerCase().trim();
    return normalized === "admin" ? "Admin" : "Member";
  }

  // Validation helpers
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return null;
  }

  validatePassword(password) {
    if (!password || password.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (password.length > 50) {
      return "Password cannot exceed 50 characters";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must contain at least one special character (!@#$%^&*)";
    }
    return null;
  }

  validateUsername(username) {
    if (!username || username.length < 3) {
      return "Username must be at least 3 characters";
    }
    if (username.length > 30) {
      return "Username cannot exceed 30 characters";
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return "Username can only contain letters, numbers, and underscores";
    }
    return null;
  }

  async signup(username, email, password, questionnaire, role = "Member") {
    return new Promise((resolve, reject) => {
      // Validate inputs
      const usernameError = this.validateUsername(username);
      if (usernameError) return reject(usernameError);

      const emailError = this.validateEmail(email);
      if (emailError) return reject(emailError);

      const passwordError = this.validatePassword(password);
      if (passwordError) return reject(passwordError);

      // Check if email already exists
      User.findByEmail(email, async (err, emailResult) => {
        if (err) return reject("Database error");
        if (emailResult.length > 0) return reject("This email is already registered");

        // Check if username already exists
        User.findByUsername(username, async (usernameErr, usernameResult) => {
          if (usernameErr) return reject("Database error");
          if (usernameResult.length > 0) return reject("This username is already taken");

          const hashedPassword = await bcrypt.hash(password, 10);
          const normalizedRole = this.normalizeRole(role);
          const newUser = new User(null, username, email, hashedPassword, normalizedRole);

          newUser.save((saveErr, saveResult) => {
            if (saveErr || !saveResult) return reject("Signup failed");

            const userId = saveResult.insertId;

            // Return user data for auto-login
            const userData = {
              id: userId,
              username: username,
              email: email,
              role: normalizedRole
            };

            // Create welcome notification
            const db = require("../config/database.js").default.getConnection();
            db.query(
              "INSERT INTO notifications (user_id, type, title, message) VALUES (?, ?, ?, ?)",
              [userId, "welcome", "Welcome to FitVerse!", `Hi ${username}! Start your fitness journey today.`],
              () => {} // Fire and forget
            );

            if (questionnaire) {
              Questionnaire.saveForUser(userId, questionnaire, (qErr) => {
                if (qErr) {
                  console.error("Failed to save questionnaire:", qErr);
                }
                resolve(userData);
              });
            } else {
              resolve(userData);
            }
          });
        });
      });
    });
  }

  async login(email, password) {
    return new Promise((resolve, reject) => {
      // Basic validation
      const emailError = this.validateEmail(email);
      if (emailError) return reject(emailError);

      if (!password) return reject("Password is required");

      User.findByEmail(email, async (err, result) => {
        if (err) return reject("Database error");
        if (result.length === 0) return reject("Invalid credentials");

        const user = result[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) return reject("Invalid credentials");

        // Normalize role from database, default to "Member"
        const role = this.normalizeRole(user.role);
        
        console.log(`✅ Login successful: ${email} → role: ${role}`);

        resolve({
          id: user.id,
          username: user.username,
          email: user.email,
          role: role,
        });
      });
    });
  }
}

export default new AuthService();
