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

  async signup(username, email, password, questionnaire, role = "Member") {
    return new Promise((resolve, reject) => {
      User.findByEmail(email, async (err, result) => {
        if (err) return reject("Database error");
        if (result.length > 0) return reject("User already exists");

        const hashedPassword = await bcrypt.hash(password, 10);
        const normalizedRole = this.normalizeRole(role);
        const newUser = new User(null, username, email, hashedPassword, normalizedRole);

        newUser.save((saveErr, saveResult) => {
          if (saveErr || !saveResult) return reject("Signup failed");

          const userId = saveResult.insertId;

          if (questionnaire) {
            Questionnaire.saveForUser(userId, questionnaire, (qErr) => {
              if (qErr) {
                console.error("Failed to save questionnaire:", qErr);
              }
              resolve("Signup successful");
            });
          } else {
            resolve("Signup successful");
          }
        });
      });
    });
  }

  async login(email, password) {
    return new Promise((resolve, reject) => {
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
