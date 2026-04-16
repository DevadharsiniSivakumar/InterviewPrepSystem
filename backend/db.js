const { Pool } = require("pg")
require("dotenv").config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:Devadharsini@123@localhost:5432/ai_interview_platform",
})

// Automatically create tables if they don't exist
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(100)
  );

  CREATE TABLE IF NOT EXISTS results (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      score INTEGER,
      total_questions INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`).catch(err => console.error("Database initialization error:", err));

module.exports = pool