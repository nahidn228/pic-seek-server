//definition
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./middleware/logger");

const imageRouter = require("./routes/image.routes");
const { commentRouter } = require("./routes/comment.routes");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//middleware
app.use(cors());
app.use(express.json());
app.use(logger);

//routes
app.use("/api/v1/image", imageRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/chat", commentRouter);

//MOdel
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//playground

app.get("/", (req, res) => {
  res.send("🏹 Hello World!");
});

app.get("/chat", async (req, res) => {
  // const prompt = req.query.prompt;
  const prompt = "How ai works";
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  res.send({ message: result.response.text() });
});

module.exports = app;
