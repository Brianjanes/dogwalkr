"use strict";
// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const { addPost, deletePost } = require("./Handlers/PostHandlers");

const {
  getUser,
  getUsers,
  addUser,
  deleteUser,
} = require("./Handlers/UserHandlers");

const app = express();

// This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
app.use(morgan("tiny"));
app.use(express.json());

// Any requests for static files will go into the public folder
app.use(express.static("public"));

// these are our users endpoints.
app.get("/users", getUsers);
app.get("/users/:userName", getUser);
app.post("/users", addUser);
app.delete("/users/:userName", deleteUser);

//these are our post endpoints
app.post("/posts", addPost);
app.delete("/posts/:id", deletePost);

// this is our catch all endpoint.
app.get("*", (request, response) => {
  response.status(404).json({
    status: 404,
    message: "Nothing to see here.",
  });
});

// Node spins up our server and sets it to listen on port 8000.
app.listen(8000, () => console.log(`Listening on port 8000`));
