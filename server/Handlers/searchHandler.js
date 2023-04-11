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

const searchHandler = async (request, response) => {
  const searchWord = String(request.params.searchWord);
  try {
    await client.connect();
    await usersCollection.createIndex({
      userName: "text",
    });
    const findUser = await usersCollection
      .find({ $text: { $search: searchWord } })
      .toArray();
    return response.status(200).json({
      status: 200,
      data: findUser,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "Internal Server Error.",
    });
  } finally {
    client.close();
  }
};

module.exports = { searchHandler };
