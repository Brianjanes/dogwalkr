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

//this is out handler for all users
const getUsers = async (request, response) => {
  try {
    await client.connect();
    const users = await usersCollection.find().toArray();
    if (!users) {
      return response.status(404).json({
        status: 404,
        data: "No users found",
      });
    } else {
      return response.status(200).json({
        status: 200,
        data: users,
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

const getUserById = async (request, response) => {
  const { _id } = request.params;
  try {
    const userId = await usersCollection.findOne({ _id });
    if (!userId) {
      return response.status(404).json({
        status: 404,
        data: "User not found",
      });
    }
    if (userId) {
      return response.status(200).json({
        status: 200,
        data: userId,
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
//this is our handler for getting a single user
const getUserByEmail = async (request, response) => {
  const { email } = request.params;
  const newClient = new MongoClient(MONGO_URI, options);
  const newDb = newClient.db("DOGWALKR");
  const newUsersCollection = newDb.collection("users");
  try {
    await newClient.connect();
    const user = await newUsersCollection.findOne({ email });
    if (user) {
      return response.status(200).json({
        status: 200,
        data: user,
      });
    } else if (!user) {
      return response.status(404).json({
        status: 404,
        data: "User not found",
      });
    } else {
      return response.status(500).json({
        status: 500,
        data: "Internal server error",
      });
    }
  } catch (error) {
    console.log("ERROR:", error);
  } finally {
    newClient.close();
  }
};

const getUserByUserName = async (request, response) => {
  const userName = request.params.userName;
  try {
    await client.connect();
    const user = await usersCollection.findOne({ userName });
    if (user.userName === userName) {
      return response.status(200).json({
        status: 200,
        data: user,
      });
    } else {
      return response.status(404).json({
        status: 404,
        data: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      data: "Internal server error",
    });
  } finally {
    client.close();
  }
};

//this is our handler for checking if a user should be sent to further registration
const checkUser = async (request, response) => {
  const { email } = request.query;
  try {
    await client.connect();
    const user = await usersCollection.findOne({ email });
    if (user) {
      return response.status(200).json({
        status: 200,
        inDB: true,
        data: user,
      });
    } else {
      return response.status(401).json({
        status: 401,
        inDB: false,
      });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({
      status: 500,
      data: error,
    });
  } finally {
    client.close();
  }
};

const addUser = async (request, response) => {
  const { image, firstName, lastName, userName, email, location, bio } =
    request.body.formInformation;
  try {
    await client.connect();
    const newUser = {
      userName,
      firstName,
      lastName,
      email,
      location,
      bio,
      image,
      friends: [],
    };
    const newUserResult = await usersCollection.insertOne(newUser);
    if (!newUserResult.insertedId) {
      return response.status(502).json({
        status: 502,
        message: "Database error.",
      });
    }
    return response.status(200).json({
      status: 200,
      message: "User added successfully.",
      data: newUserResult,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  } finally {
    client.close();
  }
};

//this is handler for deleting a user
const deleteUser = async (request, response) => {
  const userName = String(request.params.userName);
  try {
    await client.connect();
    const user = await usersCollection.find({ userName }).toArray();
    if (!user) {
      return response.status(404).json({
        status: 404,
        message: "User not found",
      });
    } else {
      await usersCollection.deleteOne({ userName });
      return response.status(200).json({
        status: 200,
        message: "User deleted successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  } finally {
    client.close();
  }
};

const updateOneUser = async (request, response) => {
  const userName = request.params.userName;
  const { firstName, lastName, bio } = request.body;
  try {
    await client.connect();
    const user = await usersCollection.findOne({ userName });
    if (!user) {
      return response.status(404).json({
        status: 404,
        message: "User not found",
      });
    } else {
      const updateUser = await usersCollection.updateOne(
        { userName },
        {
          $set: {
            firstName,
            lastName,
            bio,
          },
        }
      );
      if (updateUser.modifiedCount > 0) {
        return response.status(200).json({
          status: 200,
          data: updateUser,
          message: "User updated successfully",
        });
      } else {
        return response.status(400).json({
          status: 400,
          message: "Something went wrong.",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  } finally {
    client.close();
  }
};

module.exports = {
  getUsers,
  getUserByEmail,
  checkUser,
  addUser,
  deleteUser,
  updateOneUser,
  getUserByUserName,
  getUserById,
};
