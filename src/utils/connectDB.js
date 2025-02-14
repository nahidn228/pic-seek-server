require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db("pic-seek-ai");
const imageCollection = db.collection("images");
const commentsCollection = db.collection("comments");

async function connectDB() {
  return client.connect();
}
connectDB().catch(console.dir);
module.exports = { connectDB, imageCollection, commentsCollection };
