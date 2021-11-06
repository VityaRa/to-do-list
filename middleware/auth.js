const jwt = require("jsonwebtoken");

const config = process.env;
const objectId = require("mongodb").ObjectId;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  const userId = req.body.userId || req.query.userId;
  const userEmail = req.body.email || req.query.email;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded.email;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  if (userEmail !== req.user) {
    return res.status(409).send("Wrong email")
  }
  req.userId = userId

  return next();
};

module.exports = verifyToken;