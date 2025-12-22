import Database from "../config/database.js";

class User {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static findByEmail(email, callback) {
    const db = Database.getConnection(); // <-- instance method
    db.query("SELECT * FROM users WHERE email = ?", [email], callback);
  }

  save(callback) {
    const db = Database.getConnection(); // <-- instance method
    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [this.username, this.email, this.password],
      (err, result) => callback(err, result)
    );
  }
}

export default User;
