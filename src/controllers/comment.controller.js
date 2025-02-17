const { generateAiReply } = require("../utils/ai/generateAiReply");
const { commentsCollection } = require("../utils/connectDB");

const postUserComment = async (req, res) => {
  const { imageId, prompt, comment, email } = req.body;
  if (!imageId || !prompt || !email) {
    res.status(400).send({
      status: 400,
      message: "please provide valid imageId, prompt and email",
    });
    return;
  }
  const reply = await generateAiReply(prompt, comment);
  const document = {
    prompt,
    imageId,
    comment,
    email,
    reply,
    createdAt: new Date().toISOString(),
  };
  const result = await commentsCollection.insertOne(document);
  res.send({ ...result, reply });
};

const getUserComment = async (req, res) => {
  try {
    const result = await commentsCollection
      .find()
      .project({
        comment: 1,
        reply: 1,
      })
      .toArray();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getSingleUserComment = async (req, res) => {
  try {
    const { email, imageId } = req.params;
    const filter = { email: email, imageId: imageId };

    const result = await commentsCollection.find(filter).toArray();
    res.send(result);
  } catch (error) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { postUserComment, getUserComment, getSingleUserComment };
