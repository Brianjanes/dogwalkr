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
const addFriend = async (req, res) => {};
// const addFriend = async (request, response) => {
//   const { email, friendEmail } = request.body;
//   try {
//     const currentUser = await usersCollection.find({ email }).toArray();
//     console.log("current user", currentUser);
//     if (!currentUser) {
//       return response.status(404).json({
//         status: 404,
//         message: "User not found.",
//       });
//     }
//     const targetUser = await usersCollection
//       .find({ email: friendEmail })
//       .toArray();
//     console.log("target user", targetUser);
//     if (!targetUser) {
//       return response.status(404).json({
//         status: 404,
//         message: "Target user not found.",
//       });
//     }
//     const isFriend = currentUser.friends.some(
//       (friend) => friend.email === friendEmail
//     );
//     if (isFriend) {
//       return response.status(400).json({
//         status: 400,
//         message: "You are already friends with this user.",
//       });
//     }
//     const updatedUser = await usersCollection.findOneAndUpdate(
//       { email },
//       {
//         $push: {
//           friends: {
//             _id: targetUser._id,
//             image: targetUser.image,
//             userName: targetUser.userName,
//             firstName: targetUser.firstName,
//             lastName: targetUser.lastName,
//             email: targetUser.email,
//             location: targetUser.location,
//             bio: targetUser.bio,
//           },
//         },
//       },
//       { returnOriginal: false }
//     );
//     return response.status(200).json({
//       status: 200,
//       message: "Friend added successfully.",
//       data: updatedUser.friends,
//     });
//
//   } catch (error) {
//     console.log(error);
//     response.status(500).json({
//       status: 500,
//       message: "Internal server error.",
//     });
//   } finally {
//     client.close();
//   }
// };
// console.log(currentUser[0].friends[0].email);
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
