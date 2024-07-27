const path = require("node:path");
const express = require("express");
const multer = require("multer");

const {
  createProduct,
  getProducts,
  getProduct,
  editProduct,
  deleteProduct,
} = require("./product.controller");

const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 3e7 }, // 30mb 30 * 1024 * 1024
});

const productRouter = express.Router();

productRouter.post("/", upload.single("image"), createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.put("/:id", editProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
