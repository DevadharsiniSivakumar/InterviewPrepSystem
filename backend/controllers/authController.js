const pool = require("../db")
const bcrypt = require("bcrypt")

exports.register = async (req,res)=>{

const {name,email,password} = req.body

const hashed = await bcrypt.hash(password,10)

await pool.query(
"INSERT INTO users(name,email,password) VALUES($1,$2,$3)",
[name,email,hashed]
)

res.json({message:"User registered"})
}


exports.login = async (req,res)=>{

const {email,password} = req.body

const user = await pool.query(
"SELECT * FROM users WHERE email=$1",
[email]
)

if(user.rows.length===0)
return res.status(400).json({message:"User not found"})

const valid = await bcrypt.compare(
password,
user.rows[0].password
)

if(!valid)
return res.status(400).json({message:"Wrong password"})

res.json(user.rows[0])

}