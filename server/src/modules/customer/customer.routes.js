const path = require("node:path");
const express = require("express");
const { registerCustomer, loginCustomer } = require("./customer.controller");

const customerRouter = express.Router();

customerRouter.post("/register", registerCustomer);
customerRouter.post("/login", loginCustomer);

module.exports = customerRouter;
