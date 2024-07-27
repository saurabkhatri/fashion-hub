const path = require("node:path");
const express = require("express");
const multer = require("multer");

const {
  getProductAndBillboard,
  createBillboard,
} = require("./billboard.controller");

const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 3e7 }, // 30mb 30 * 1024 * 1024
});

const billboardRouter = express.Router();

billboardRouter.post("/", upload.single("image"), createBillboard);
billboardRouter.get("/", getProductAndBillboard);

module.exports = billboardRouter;
