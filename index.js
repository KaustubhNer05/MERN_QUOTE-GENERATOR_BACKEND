const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
}).promise()

app.get("/quotes/:category", async (req, res) => {
	try {
		const category = req.params.category
		const [rows] = await pool.query("SELECT * FROM quotes WHERE category = ?", [category])
		res.json(rows)
	} catch (err) {
		res.status(500).json({ error: "Internal Server Error" })
	}
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})