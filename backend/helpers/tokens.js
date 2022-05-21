const jwt = require("jsonwebtoken");

/* verify user with https://jwt.io/ */

exports.generateToken = (payload, expired) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: expired
  });
};
