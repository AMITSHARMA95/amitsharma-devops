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

app.get("/", (req, res) => {
  res.send("Product Service Running 🚀");
});

app.get("/health", (req, res) => {
  res.json({ service: "product-service", status: "UP" });
});

app.get("/products", async (req, res) => {
  const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
  res.json(result.rows);
});

app.post("/products", async (req, res) => {
  const { name, price, stock } = req.body;

  const result = await pool.query(
    "INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING *",
    [name, price, stock || 0]
  );

  res.status(201).json({
    message: "Product created successfully",
    product: result.rows[0]
  });
});

app.listen(3004, () => {
  console.log("Product service running on port 3004");
});
