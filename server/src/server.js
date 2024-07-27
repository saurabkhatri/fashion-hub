require("dotenv").config();

const express = require("express");
const cors = require("cors");

const productRouter = require("./modules/product/product.routes");
const customerRouter = require("./modules/customer/customer.routes");
const categoryRouter = require("./modules/category/category.routes");

const connectDB = require("./config/db");
const billboardRouter = require("./modules/billboard/billboard.routes");
const orderRouter = require("./modules/order/order.routes");
const paymentRouter = require("./modules/payment/payment.routes");
const feedbackRouter = require("./modules/feedback/feedback.routes");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/products", productRouter);
app.use("/customers", customerRouter);
app.use("/categories", categoryRouter);
app.use("/billboards", billboardRouter);
app.use("/orders", orderRouter);
app.use("/payments", paymentRouter);
app.use("/feedbacks", feedbackRouter);

const startServer = async () => {
  await connectDB();
  app.listen(4000, () => console.log("SERVER LISTENING"));
};

startServer();
