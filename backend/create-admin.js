import bcrypt from "bcryptjs";
import Database from "./config/database.js";

const createAdmin = async () => {
  const password = "admin123";
  const hashedPassword = await bcrypt.hash(password, 10);
  
  console.log("Hashed password:", hashedPassword);
  
  const db = Database.getConnection();
  
  // First delete existing admin if any
  db.query("DELETE FROM users WHERE email = 'admin@fitness.com'", (err) => {
    if (err) console.log("Delete error (ok if not exists):", err.message);
    
    // Insert new admin
    db.query(
      "INSERT INTO users (username, email, password, role, status) VALUES (?, ?, ?, ?, ?)",
      ["Admin", "admin@fitness.com", hashedPassword, "Admin", "Active"],
      (err, result) => {
        if (err) {
          console.error("Error creating admin:", err);
        } else {
          console.log("✅ Admin created successfully!");
          console.log("Email: admin@fitness.com");
          console.log("Password: admin123");
        }
        process.exit();
      }
    );
  });
};

createAdmin();
