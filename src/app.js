//definition
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./middleware/logger");
const connectDB = require("./utils/connectDB");
const getImageBuffer = require("./utils/ai/getImageBuffer");
const generateImageURL = require("./utils/ai/generateImageURL");

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
      message:
        "please provide an email, prompt, username, userImg and category",
    });
  }
  try {
    // 1 + 2: create a prompt & generate image buffer
    const buffer = await getImageBuffer(prompt, category);

    // 3: upload image and get url
    const data = await generateImageURL(buffer, prompt);
    console.log(data);

    res.send(data);
    // 4: insert data in mongoDB
    // 5:
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get("/", (req, res) => {
  res.send("🏹 Hello World!");
});

module.exports = app;
