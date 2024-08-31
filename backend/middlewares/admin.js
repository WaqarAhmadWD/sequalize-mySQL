let jwt = require("jsonwebtoken");
require("dotenv").config();

const admin = function (req, res, next) {
  try {
    const token = req.header("token");
    if (token) {
      jwt.verify(token, process.env.TOKEN_KEY, function (err, decoded) {
        if (err) {
          return res.json(err);
        } else {
          req.user = decoded.id;
          return next();
        }
      });
    } else {
      return res.json({ mess: "token does not exist" });
    }
  } catch (error) {
    return res.json(error);
  }
};

module.exports = admin;
