const express = require("express");
const redis = require("redis");

const app = express();
app.use(express.json());

const redisHost = process.env.REDIS_HOST || "127.0.0.1";

const client = redis.createClient({
  socket: {
    host: redisHost,
    port: 6379
  }
});

client.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

(async () => {
  await client.connect();
  console.log("Connected to Redis");
})();

app.get("/health", (req, res) => {
  res.json({ service: "cart-service", status: "UP" });
});

app.post("/cart/add", async (req, res) => {
  const { userId, productId, name, price, quantity } = req.body;

  const cartKey = `cart:${userId}`;

  const existingCart = await client.get(cartKey);
  const cart = existingCart ? JSON.parse(existingCart) : [];

  cart.push({ productId, name, price, quantity });

  await client.set(cartKey, JSON.stringify(cart));

  res.json({ message: "Item added to cart" });
});

app.get("/cart/:userId", async (req, res) => {
  const cartKey = `cart:${req.params.userId}`;
  const cart = await client.get(cartKey);
  res.json(cart ? JSON.parse(cart) : []);
});

app.listen(3002, () => {
  console.log("Cart service running on port 3002");
});
