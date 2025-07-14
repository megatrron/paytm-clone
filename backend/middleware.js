const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const decodedData = jwt.verify(token, JWT_SECRET);
    req.userId = decodedData.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = {
  authMiddleware,
};
