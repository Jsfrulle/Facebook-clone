const User = require("../models/User");
const {
  validateEmail,
  validateLength,
  validateUsername
} = require("../helpers/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { now } = require("mongoose");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      password,
      username,
      email,
      gender,
      bYear,
      bMonth,
      bDay
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "invaild email adress" });
    }
    const checkEmail = await User.findOne({ email: email });
    if (checkEmail) {
      return res.status(400).json({
        message:
          "This email adress already exist, please try with a diffrent email adress"
      });
    }
    if (!validateLength(first_name, 2, 20)) {
      return res
        .status(400)
        .json({ message: "Firstname must be between 2 and 20 characters" });
    }
    if (!validateLength(last_name, 2, 20)) {
      return res
        .status(400)
        .json({ message: "Lastname must be between 2 and 20 characters" });
    }

    if (!validateLength(password, 6, 40)) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });
    }

    const crypted = await bcrypt.hash(password, 12);

    /* tempUsername creates a new username with first and lastname 
    and if the username already exist the function validUsername make it unique */
    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    const user = await new User({
      first_name,
      last_name,
      password: crypted,
      username: newUsername,
      email,
      gender,
      bYear,
      bMonth,
      bDay
    }).save();

    /* Set up a email verification function   */
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30s"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      response: {
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "registration successful! Please activate your account to start"
     }});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);
    if (check.verified === true) {
      return res
        .status(400)
        .json({ message: "This email-adress is already activated" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res.status(200).json({ message: "Your account is now activated" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "No user connected to this email-adress " });
    }
    if (!user.verified) {
      return res.status(400).json({ message: "Account not verified" });
    }

    const check = await bcrypt.compareSync(password, user.password);

    if (check) {
      const token = generateToken({ id: user._id.toString() }, "7d");

      res.status(200).json({
        response: {
          id: user._id,
          username: user.username,
          picture: user.picture,
          first_name: user.first_name,
          last_name: user.last_name,
          token: token,
          verified: user.verified,
          message: "Log in successful!"
        }
      });

      /* Set up a email verification function   */
      const emailVerificationToken = generateToken(
        { id: user._id.toString() },
        "30m"
      );
    } else {
      return res.status(400).json({ message: "Password is incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
