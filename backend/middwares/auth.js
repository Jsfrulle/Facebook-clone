const jwt = require("jsonwebtoken");

exports.authUser = async (req, res, next) => {
  try {
    let tmp = req.header("Authorization");

    const token = tmp ? tmp.slice(7, tmp.length) : "";

    if (!token) {
      return res.status(400).json({ message: "Invalid Authorisation token1" });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Invalid Authorisation token2" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
