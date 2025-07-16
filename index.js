const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
}).promise();

app.get("/quotes/:category", async (req, res) => {
	const category = req.params.category;

	try {
		const [rows] = await con.query(
			"select quote from quotes where category = ? order by rand() limit 1",
			[category]
		);

		if (rows.length > 0)
		{
			res.json(rows[0]);
		}
		else
		{
			res.json({ quote: "No Quote found in this category." });
		}
	}
	catch (err) {
		console.error(err)
		res.status(500).json({ error: "Database error" });
	}
});

app.listen(5000, () => {
	console.log("Server running on http://localhost:5000");
});

















