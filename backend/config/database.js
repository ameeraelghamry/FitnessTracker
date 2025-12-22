import mysql from "mysql2";

class Database {
  static instance;

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "fitness_tracker",
    });

    this.connection.connect((err) => {
      if (err) {
        console.error("❌ DB connection failed:", err);
      } else {
        console.log("✅ Connected to MySQL");
      }
    });

    Database.instance = this;
  }

  getConnection() {
    return this.connection;
  }
}

export default new Database();
