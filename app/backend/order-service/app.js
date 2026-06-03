const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  user: "ecommerce_user",
  host: process.env.DB_HOST || "localhost",
  database: "ecommerce",
  password: "StrongPassword123",
  port: 5432
});

app.get("/health", (req, res) => {
  res.json({ service: "order-service", status: "UP" });
});

app.post("/orders", async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    if (!userId || !items || !totalAmount) {
      return res.status(400).json({ message: "Order details required" });
    }

    const result = await pool.query(
      "INSERT INTO orders (user_id, items, total_amount, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, JSON.stringify(items), totalAmount, "PLACED"]
    );

    res.status(201).json({
      message: "Order placed successfully",
      order: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.stack || error.message || String(error) });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM orders ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.stack || error.message || String(error) });
  }
});

app.listen(3003, () => {
  console.log("Order service running on port 3003");
});
