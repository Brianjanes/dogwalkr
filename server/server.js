"use strict";
// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const {
  addWalk,
  deleteWalk,
  getWalk,
  getWalks,
} = require("./Handlers/WalkHandlers");

const {
  getUserByEmail,
  getUserByUserName,
  getUsers,
  checkUser,
  addUser,
  deleteUser,
  updateOneUser,
} = require("./Handlers/UserHandlers");

const { addFriend, deleteFriend } = require("./Handlers/FriendsHandlers");

const { searchHandler } = require("./Handlers/searchHandler");

const app = express();

// This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
app.use(morgan("tiny"));
app.use(express.json());

// Any requests for static files will go into the public folder
app.use(express.static("public"));

// these are our users endpoints.
app.get("/users", getUsers);
app.get("/users/:email", getUserByEmail);
app.get("/profile/:userName", getUserByUserName);
app.get("/user/check", checkUser);
app.post("/user/addNewUser", addUser);
app.patch("/updateProfile/:userName", updateOneUser);
app.delete("/users/:userName", deleteUser);

// this is our endpoint for searching for users.
app.get("/search/:search", searchHandler);

// these are our friends endpoints.
app.post("/addFriend", addFriend);
app.delete("/friends/:_id", deleteFriend);

//these are our post endpoints
app.post("/walks/add", addWalk);
app.delete("/walks/:_id", deleteWalk);
app.get("/walks/:_id", getWalk);
app.get("/walks", getWalks);

// this is our catch all endpoint.
app.get("*", (request, response) => {
  return response.status(404).json({
    status: 404,
    message: "Nothing to see here.",
  });
});

// Node spins up our server and sets it to listen on port 8000.
app.listen(8000, () => console.log(`Listening on port 8000`));
