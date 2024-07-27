const express = require("express");

const feedbackController = require("./feedback.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

const orderRouter = express.Router();

orderRouter.post("/", authMiddleware, feedbackController.createFeedback);
orderRouter.get("/", feedbackController.getAllFeedbacks);
orderRouter.get("/:id", authMiddleware, feedbackController.getFeedbackById);
orderRouter.put("/:id", authMiddleware, feedbackController.updateFeedback);
orderRouter.delete("/:id", authMiddleware, feedbackController.deleteFeedback);

module.exports = orderRouter;
