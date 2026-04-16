const { Pool } = require("pg")
require("dotenv").config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:Devadharsini@123@localhost:5432/ai_interview_platform",
})

module.exports = pool