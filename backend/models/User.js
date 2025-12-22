import Database from "../config/database.js";

class User {
  constructor(id, username, email, password, role = "Member") {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = this.normalizeRole(role);
  }

  // Normalize role to "Member" or "Admin"
  normalizeRole(role) {
    if (!role) return "Member";
    const normalized = role.toString().toLowerCase().trim();
    return normalized === "admin" ? "Admin" : "Member";
  }

  getRole() {
    return this.role;
  }

  static findByEmail(email, callback) {
    const db = Database.getConnection();
    db.query("SELECT * FROM users WHERE email = ?", [email], callback);
  }

  static findById(id, callback) {
    const db = Database.getConnection();
    db.query("SELECT * FROM users WHERE id = ?", [id], callback);
  }

  save(callback) {
    const db = Database.getConnection();
    db.query(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [this.username, this.email, this.password, this.role],
      (err, result) => callback(err, result)
    );
  }
}

export default User;
