const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../.env" });
const { v4: uuidv4 } = require("uuid");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);
const db = client.db("DOGWALKR");
const postCollection = db.collection("posts");

const addPost = async (request, response) => {
  const { image, content, userName } = request.body;
  try {
    await client.connect();
    const id = uuidv4();
    const newPost = {
      id,
      image,
      content,
      userName,
    };

    const post = await postCollection.insertOne(newPost);
    if (!post.insertedId) {
      return response.status(502).json({
        status: 502,
        data: "Database error.",
      });
    } else {
      return response.status(201).json({
        status: 201,
        data: newPost,
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      data: error,
    });
  } finally {
    client.close();
  }
};

const deletePost = async (request, response) => {
  const id = request.params.id;
  try {
    await client.connect();
    const post = await postCollection.deleteOne({ id });
    if (!post.deletedCount) {
      return response.status(502).json({
        status: 502,
        data: "Database error.",
      });
    } else {
      return response.status(200).json({
        status: 200,
        message: "Post deleted successfully.",
        data: post,
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      data: "Internal server error.",
    });
  } finally {
    client.close();
  }
};

module.exports = { addPost, deletePost };
