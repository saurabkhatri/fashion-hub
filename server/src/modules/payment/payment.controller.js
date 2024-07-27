const Order = require("../order/order.model");
const Payment = require("./payment.model");

// http://localhost:5473/profile?pidx=gimePxJ8rTos9sYVsLisJW&transaction_id=5RGPJLEodvbHYFmArgAR5T&tidx=5RGPJLEodvbHYFmArgAR5T&amount=10000&total_amount=10000&mobile=98XXXXX002&status=Completed&purchase_order_id=66a111901965e35622a42038&purchase_order_name=66a0f644aefa6aa0eab27769

const updatePayment = async (req, res) => {
  const { transactionId, orderId } = req.body;

  try {
    const payment = await Payment.findOne({ order: orderId });
    await Order.findByIdAndUpdate(orderId, {
      $set: { status: "SHIPPED" },
    });

    payment.status = "SUCCESS";
    payment.transactionId = transactionId;

    await payment.save();
    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({ error: "Error while uploading the files." });
  }
};

module.exports = { updatePayment };
