//definition

const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());

//playground

app.get("/", (req, res) => {
  res.send("🏹 Hello World!");
});

module.exports = app;
