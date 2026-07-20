const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let products = [];

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/products", (req, res) => {
  if (products.length >= 5) {
    return res.status(400).json({ msg: "Maximum 5 products allowed" });
  }
  const id = Date.now(); // simple unique id
  products.push({ id, ...req.body });
  res.json({ msg: "added" });
});

app.delete("/api/products/:id", (req, res) => {
  products = products.filter(p => p.id != req.params.id);
  res.json({ msg: "deleted" });
});

app.listen(5000, () => console.log("Server running on 5000"));