const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../.env" });
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);
const db = client.db("DOGWALKR");
const postCollection = db.collection("posts");
const ObjectId = require("mongodb").ObjectId;

//this is our handler for adding a new post
const addWalk = async (request, response) => {
  const { dateTime, userName, location, endTime, startTime, capacity } =
    request.body;
  try {
    await client.connect();
    const newWalk = {
      userName,
      location,
      endTime,
      startTime,
      capacity,
      dateTime,
      attendees: [{}],
    };
    const walk = await postCollection.insertOne(newWalk);
    if (!walk.insertedId) {
      return response.status(502).json({
        status: 502,
        data: "Database error.",
      });
    } else {
      return response.status(201).json({
        status: 201,
        data: newWalk,
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

//this is out handler for deleting a single post
const deleteWalk = async (request, response) => {
  const { _id } = request.body;
  try {
    await client.connect();
    const deleteRequest = await postCollection.deleteOne({
      _id: new ObjectId(_id),
    });
    console.log(deleteRequest);
    if (deleteRequest.deletedCount !== 0) {
      return response.status(200).json({
        status: 200,
        message: "Walk deleted successfully.",
        data: deleteRequest,
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      data: "Internal Server Error.",
    });
  } finally {
    client.close();
  }
};

//this is our handler for getting a post by its id
const getWalk = async (request, response) => {
  const _id = request.params._id;
  try {
    await client.connect();
    const walk = await postCollection.findOne({ _id });
    if (!walk) {
      return response.status(502).json({
        status: 502,
        data: "Database error.",
      });
    } else {
      return response.status(200).json({
        status: 200,
        data: walk,
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

const getWalks = async (request, response) => {
  try {
    await client.connect();
    const walks = await postCollection.find({}).toArray();
    if (!walks) {
      return response.status(502).json({
        status: 502,
        data: "Database error.",
      });
    } else {
      return response.status(200).json({
        status: 200,
        data: walks,
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

const updateWalk = async (request, response) => {
  const { userName, _id } = request.body;
  try {
    await client.connect();
    const findWalk = await postCollection.find({ _id }).toArray();
    if (!findWalk) {
      return response.status(404).json({
        status: 404,
        message: "Walk not found.",
      });
    } else {
      await postCollection.updateOne(
        { _id },
        {
          $push: {
            attendees: userName,
          },
        }
      );
      return response.status(200).json({
        status: 200,
        data: findWalk,
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

module.exports = { addWalk, getWalk, deleteWalk, getWalks, updateWalk };
