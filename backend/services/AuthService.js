import bcrypt from "bcryptjs";
import User from "../models/User.js";

class AuthService {
  async signup(username, email, password) {
    return new Promise((resolve, reject) => {
      User.findByEmail(email, async (err, result) => {
        if (err) return reject("Database error");
        if (result.length > 0) return reject("User already exists");

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(null, username, email, hashedPassword);

        newUser.save((err) => {
          if (err) return reject("Signup failed");
          resolve("Signup successful");
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
