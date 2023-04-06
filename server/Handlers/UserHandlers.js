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
//this is our handler for getting a single user
const getUser = async (request, response) => {
  const email = request.params.email;
  try {
    await client.connect();
    const user = await usersCollection.findOne({ email });
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
    console.log(error);
    return response.status(500).json({
      status: 500,
      data: error,
    });
  } finally {
    client.close();
  }
};

const addUser = async (request, response) => {
  const { firstName, lastName, userName, email, location, bio } =
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
      friends: [
        {
          _id: "642e26065c986a1e56d5ff5d",
          image: "",
          userName: "glen",
          firstName: "glen",
          lastName: "may",
          email: "glenisnice@gmail.com",
          location: "st johns",
          bio: "i'm a nice guy",
        },
      ],
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
      message: "Internal server error",
    });
  } finally {
    client.close();
  }
};

const updateOneUser = async (request, response) => {
  const userName = request.params.userName;
  const { firstName, lastName, email, location, petName, friends } =
    request.body;
  try {
    await client.connect();
    const user = await usersCollection.findOne({ userName });
    if (!user) {
      return response.status(404).json({
        status: 404,
        message: "User not found",
      });
    } else {
      await usersCollection.updateOne(
        { userName },
        {
          $set: {
            firstName,
            lastName,
            email,
            location,
            petName,
            friends,
          },
        }
      );
      return response.status(200).json({
        status: 200,
        message: "User updated successfully",
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

module.exports = {
  getUsers,
  getUser,
  checkUser,
  addUser,
  deleteUser,
  updateOneUser,
};
