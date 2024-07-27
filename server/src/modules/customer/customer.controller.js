const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Customer = require("./customer.model");

const registerCustomer = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const customer = await Customer.findOne({ email });
    if (customer) {
      return res
        .status(400)
        .json({ error: "Customer already exists with this email." });
    }
    const hash = await bcrypt.hash(password, 10);
    await Customer.create({
      name,
      email,
      password: hash,
    });

    return res.status(201).json({ message: "CREATED" });
  } catch (err) {
    return res.status(500).json({ error: "Error while creating customer." });
  }
};

const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ error: "Customer not found." });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "Customername or password incorrect!" });
    }

    const accessToken = jwt.sign(
      { sub: customer._id },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "7d",
        algorithm: "HS256",
      }
    );

    return res.json({ accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error while creating customer." });
  }
};

module.exports = { registerCustomer, loginCustomer };
