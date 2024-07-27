const { initializeKhaltiPayment } = require("../../config/khalti.js");
const Payment = require("../payment/payment.model.js");
const Order = require("./order.model.js");

const createOrder = async (req, res) => {
  const amount = parseFloat(req.body.amount);
  const items = req.body.items;

  try {
    const order = await Order.create({
      amount,
      items,
      customer: req.user.sub,
    });

    const data = await initializeKhaltiPayment({
      amount: amount * 100, // amount should be in paisa (Rs * 100)
      purchase_order_id: order._id,
      purchase_order_name: req.user.sub,
      return_url: `http://localhost:5173/orders/shipping`,
      website_url: `http://localhost:5473`,
    });

    const payment = await Payment.create({
      amount,
      pidx: data.pidx,
      payment_url: data.payment_url,
      order: order._id,
      customer: req.user.sub,
    });

    return res
      .status(201)
      .json({ paymentUrl: data.payment_url, paymentId: payment._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error while uploading the files." });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.sub });
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: "Error while uploading the files." });
  }
};
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: "Error while uploading the files." });
  }
};

module.exports = { createOrder, getOrder, getOrders };
