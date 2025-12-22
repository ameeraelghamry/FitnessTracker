import dotenv from "dotenv";
dotenv.config(); // MUST be before any process.env usage

import mysql from "mysql2";


class Database {
  static instance;

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.connection = mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "fitness_tracker",
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
