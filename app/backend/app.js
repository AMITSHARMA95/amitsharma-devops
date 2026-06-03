const express = require("express");

const app = express();
app.use(express.json());

const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Mobile", price: 20000 },
  { id: 3, name: "Headphones", price: 3000 }
];

app.get("/", (req, res) => {
  res.send("Cloud Native E-Commerce Platform 🚀");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP"
  });
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
