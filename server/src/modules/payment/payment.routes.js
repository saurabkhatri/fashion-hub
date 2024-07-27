const express = require("express");

const { updatePayment } = require("./payment.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

const paymentRouter = express.Router();

paymentRouter.use(authMiddleware);
paymentRouter.patch("/", updatePayment);

module.exports = paymentRouter;
