import Database from "./config/database.js";

console.log("Testing database connection...");

const db = Database.getConnection();

// Test basic connection
db.query("SELECT 1 as test", (err, result) => {
  if (err) {
    console.error("❌ Database connection test failed:", err);
    return;
  }
  console.log("✅ Database connection test passed:", result);
});

// Test users table
db.query("SELECT COUNT(*) as count FROM users", (err, result) => {
  if (err) {
    console.error("❌ Users table query failed:", err);
    return;
  }
  console.log("✅ Users table exists, count:", result[0].count);
});

// Test getting users
db.query("SELECT id, username, email, created_at FROM users LIMIT 5", (err, result) => {
  if (err) {
    console.error("❌ Users query failed:", err);
    return;
  }
  console.log("✅ Sample users:", result);
  process.exit(0);
});