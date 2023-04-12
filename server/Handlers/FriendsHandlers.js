"use strict";
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
const ObjectId = require("mongodb").ObjectId;

//this handler is for adding a friend
const addFriend = async (request, response) => {
  const { loggedUserId, targetUserId } = request.body;
  try {
    await client.connect();
    const findUser = await usersCollection.findOne({
      _id: new ObjectId(loggedUserId),
    });
    if (findUser.friends._id === targetUserId) {
      return response.status(400).json({
        status: 400,
        message: "You are already friends with this user.",
      });
    } else {
      await usersCollection.updateOne(
        { _id: findUser._id },
        { $push: { friends: targetUserId } }
      );
      return response.status(200).json({
        status: 200,
        message: "Friend added successfully",
      });
    }
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
  const { loggedUserId, targetUserId } = request.body;
  try {
    await client.connect();
    const findUser = await usersCollection.findOne({
      _id: new ObjectId(loggedUserId),
    });
    if (findUser.friends.includes(targetUserId)) {
      const removeFriend = await usersCollection.updateOne(
        { _id: findUser._id },
        { $pull: { friends: targetUserId } }
      );
      return response.status(200).json({
        status: 200,
        message: "Friend removed successfully",
        data: removeFriend,
      });
    }
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

const getFriendsById = async (request, response) => {
  const _id = request.params._id;
  try {
    await client.connect();
    const user = await usersCollection.findOne({ _id: new ObjectId(_id) });
    const ObjectIdArray = user.friends.map((friend) => new ObjectId(friend));
    const userFriends = await usersCollection
      .find({ _id: { $in: ObjectIdArray } })
      .toArray();

    if (!user) {
      return response.status(404).json({
        status: 404,
        message: "No friends found.",
      });
    } else {
      return response.status(200).json({
        status: 200,
        message: "Friends found",
        data: userFriends,
      });
    }
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

module.exports = { addFriend, deleteFriend, getFriendsById };
