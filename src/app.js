import express from "express";
import "dotenv/config";
import { products } from "./instances/products.js";

const app = express();
const PORT = process.env.PORT || 8080;

//ENDPOINTS

app.get("/", (req, res) => {
  res.status(200).send("<h1>It Works!</h1>");
});

app.get("/products", async (req, res) => {
  try {
    const { limit } = req.query;
    const productsAll = await products.getProducts();
    if (limit) {
      return res
        .status(200)
        .json({ status: "success", data: productsAll.slice(0, limit) });
    }
    res.status(200).json({ status: "success", data: productsAll });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const productFound = await products.getProductById(pid);
    if (productFound.error) {
      return res
        .status(404)
        .json({ status: "error", data: productFound.error });
    }
    res.status(200).json({ status: "success", data: productFound });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
});

//INICIALIZAR SERVIDOR

app.listen(PORT, () => {
  console.log("Server running on port " + PORT + "...");
});
