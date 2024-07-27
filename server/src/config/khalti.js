const axios = require("axios");

async function verifyKhaltiPayment(pidx) {
  try {
    const headersList = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
    };

    const bodyContent = JSON.stringify({
      pidx,
    });

    const reqOptions = {
      url: `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/lookup/`,
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    const response = await axios.request(reqOptions);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

async function initializeKhaltiPayment({
  return_url,
  website_url,
  amount,
  purchase_order_id,
  purchase_order_name,
}) {
  try {
    const headersList = {
      Authorization: `Key 577992644b784d4cba8e1f0a72438d9c`,
      "Content-Type": "application/json",
    };

    const bodyContent = JSON.stringify({
      return_url,
      website_url,
      amount,
      purchase_order_id,
      purchase_order_name,
    });

    const reqOptions = {
      url: `https://a.khalti.com/api/v2/epayment/initiate/`,
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    const response = await axios.request(reqOptions);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

module.exports = { initializeKhaltiPayment, verifyKhaltiPayment };
