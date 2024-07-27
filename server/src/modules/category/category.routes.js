const path = require("node:path");
const express = require("express");
const multer = require("multer");

const { createCategory, getCategories } = require("./category.controller");

const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 3e7 }, // 30mb 30 * 1024 * 1024
});

const categoryRouter = express.Router();

categoryRouter.post("/", upload.single("coverImage"), createCategory);
categoryRouter.get("/", getCategories);

module.exports = categoryRouter;
