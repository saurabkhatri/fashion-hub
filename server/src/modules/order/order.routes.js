const express = require("express");

const { createOrder, getOrders, getOrder } = require("./order.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

const orderRouter = express.Router();

orderRouter.use(authMiddleware);
orderRouter.post("/", createOrder);
orderRouter.get("/", getOrders);
orderRouter.get("/:id", getOrder);

module.exports = orderRouter;
