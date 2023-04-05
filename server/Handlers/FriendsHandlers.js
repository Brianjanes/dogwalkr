const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../.env" });
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);
const db = client.db("DOGWALKR");
const usersCollection = db.collection("users");

//this handler is for adding a friend
const addFriend = async (request, response) => {
  const { friendId } = request.body;
  try {
    const user = await usersCollection.findOne({ _id: friendId });
    if (!user) {
      return response.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    const friend = await usersCollection.findOne({ _id: user._id });
    if (friend) {
      return response.status(409).json({
        status: 409,
        message: "User already friends",
      });
    }
    await usersCollection.updateOne(
      { _id: user._id },
      { $addToSet: { friends: friendId } }
    );
    return response.status(201).json({
      status: 201,
      message: "Friend added successfully",
      data: friend,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  } finally {
    client.close();
  }
};

// this handler is for removing a friend
const deleteFriend = async (request, response) => {
  const { friendId } = request.body;
  try {
    const user = await usersCollection.findOne({ _id: friendId });
    if (!user) {
      return response.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    await usersCollection.updateOne(
      { _id: user._id },
      { $pull: { friends: friendId } }
    );
    return response.status(200).json({
      status: 200,
      message: "Friend deleted successfully",
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  } finally {
    client.close();
  }
};

module.exports = { addFriend, deleteFriend };
