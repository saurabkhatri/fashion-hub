const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Authorization token is require." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token expired." });
  }
};

module.exports = authMiddleware;
