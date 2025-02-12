//definition
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./middleware/logger");
const { connectDB, imageCollection } = require("./utils/connectDB");
const getImageBuffer = require("./utils/ai/getImageBuffer");
const generateImageURL = require("./utils/ai/generateImageURL");
const imageRouter = require("./routes/image.routes");

//middleware
app.use(cors());
app.use(express.json());
app.use(logger);

//routes
app.use('/api/v1/image', imageRouter)



//playground



app.get("/", (req, res) => {
  res.send("🏹 Hello World!");
});

module.exports = app;
