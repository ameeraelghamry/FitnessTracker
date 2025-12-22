import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Questionnaire from "../models/Questionnaire.js";

class AuthService {
  async signup(username, email, password, questionnaire) {
    return new Promise((resolve, reject) => {
      User.findByEmail(email, async (err, result) => {
        if (err) return reject("Database error");
        if (result.length > 0) return reject("User already exists");

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(null, username, email, hashedPassword);

        newUser.save((saveErr, saveResult) => {
          if (saveErr || !saveResult) return reject("Signup failed");

          const userId = saveResult.insertId;

          // If questionnaire data is provided, save it in a separate table
          if (questionnaire) {
            Questionnaire.saveForUser(userId, questionnaire, (qErr) => {
              if (qErr) {
                console.error("Failed to save questionnaire:", qErr);
              }
              // Even if questionnaire save fails, user account is created
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

        resolve({
          username: user.username,
        });
      });
    });
  }
}

export default new AuthService();
