import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // XAMPP default is empty
  database: "fitness_tracker"
});


db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL!");
});

// 2️⃣ Signup endpoint
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).send({ error: "Database error" });
    if (result.length > 0) return res.status(400).send({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashed],
      (err) => {
        if (err) return res.status(500).send({ error: "Signup failed" });
        res.send({ message: "Signup successful!" });
      }
    );
  });
});

// 3️⃣ Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).send({ error: "Database error" });
    if (result.length === 0) return res.status(400).send({ error: "Invalid email or password" });

    const user = result[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send({ error: "Invalid email or password" });

    res.send({ message: `Welcome, ${user.username}!` });
  });
});

// 4️⃣ Start server
app.listen(3000, () => console.log("Server running on port 3000"));
