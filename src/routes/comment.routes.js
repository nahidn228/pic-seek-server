const express = require("express");
const {
  postUserComment,
  getUserComment,
} = require("../controllers/comment.controller");
const commentRouter = express.Router();

commentRouter.post("/create", postUserComment);
commentRouter.get("/create", getUserComment);

module.exports = { commentRouter };
