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
const usersCollection = db.collection("users");

const getUsers = async (request, response) => {
  try {
    await client.connect();
    const users = await usersCollection.find().toArray();
    return response.status(200).json({
      status: 200,
      data: users,
    });
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

const getUser = async (request, response) => {
  const userName = request.params.userName;
  try {
    await client.connect();
    const user = await usersCollection.findOne({ userName });
    return response.status(200).json({
      status: 200,
      data: user,
    });
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

const addUser = async (request, response) => {
  const { userName, firstName, lastName, email, location, petName } =
    request.body;
  try {
    await client.connect();
    const user = await usersCollection.findOne({ userName });
    if (user) {
      return response.status(404).json({
        status: 404,
        message: "User already exists",
      });
    } else {
      const id = uuidv4();
      const newUser = {
        id,
        userName,
        firstName,
        lastName,
        email,
        location,
        petName,
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

const deleteUser = async (request, response) => {
  const userName = request.params.userName;
  try {
    await client.connect();
    const user = await usersCollection.findOne({ userName });
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
      data: error,
    });
  } finally {
    client.close();
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  deleteUser,
};
