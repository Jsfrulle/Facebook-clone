const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// routes

const { register, activateAccount, login } = require("./controllers/user");



app.post("/register", register);
app.post("/activate", activateAccount);
app.post("/login", login);



// database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
  })
  .then(() => console.log("database conected successfully" ) )
  .catch((err) => console.log("error to conect mongodb"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`app is running on ${PORT}...`);
});
