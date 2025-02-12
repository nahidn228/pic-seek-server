const express = require("express");
const generateImageURL = require("../utils/ai/generateImageURL");
const getImageBuffer = require("../utils/ai/getImageBuffer");
const { imageCollection } = require("../utils/connectDB");
const imageRouter = express.Router();

imageRouter.post("/create", async (req, res) => {
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

    // 4: insert data in mongoDB
    const document = {
      email,
      prompt,
      username,
      userImg,
      category,
      thumb_img: data.data.thumb.url,
      medium_img: data.data.medium.url,
      original_img: data.data.url,

      createdAt: new Date().toISOString(),
    };

    const result = await imageCollection.insertOne(document);

    // 5: send response

    res.send({ ...result, url: document.original_img });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = imageRouter;
