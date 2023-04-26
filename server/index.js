require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
// const cors = require("cors");
// const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;
const app = express();


app.use(express.json())
app.use("/auth", authRouter)



const start = async () => {
  try {
    await mongoose.connect(process.env.URL_DATABASE)
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();