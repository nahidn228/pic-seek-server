const express = require("express");
const {
  postUserComment,
  getUserComment,
  getSingleUserComment,
} = require("../controllers/comment.controller");
const commentRouter = express.Router();

commentRouter.post("/create", postUserComment);
commentRouter.get("/comments", getUserComment);
commentRouter.get("/comment/:email/:imageId", getSingleUserComment);

module.exports = { commentRouter };
