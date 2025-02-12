//definition
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./middleware/logger");
const connectDB = require("./utils/connectDB");
const getImageBuffer = require("./utils/ai/getImageBuffer");

//middleware
app.use(cors());
app.use(express.json());
app.use(logger);

//playground

app.post("/create-image", async (req, res) => {
  const { email, prompt, username, userImg, category } = req.body;
  if (!email || !prompt || !username || !userImg || !category) {
    res.status(400).send({
      status: 400,
      message: "please provide email, prompt, username, userImg, category",
    });

    // 1 + 2: create a prompt & generate image buffer
    const buffer = getImageBuffer(prompt, category);

    // 3: 
  }
});

app.get("/", (req, res) => {
  res.send("🏹 Hello World!");
});

module.exports = app;
