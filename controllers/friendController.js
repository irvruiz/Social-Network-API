const { Friend } = require("../models/friends");

const friendController = {
  getAllFriends(req, res) {
      //return "arrived";
      Friend.find({})
      .select("-__v")
      .then((friendsDataDB) => res.json(friendsDataDB))
      .catch((err) => res.status(500).json({ err: err.message }));
  },

  getSingleFriends({ params }, res) {
    friends.findOne({ _id: params.friendsId })
      .select("-__v")
      .then((userDataDB) =>
        userDataDB
          ? res.json(userDataDB)
          : res.status(404).json({ message: user404Message(params.userId) })
      )
      .catch((err) => res.status(500).json({ err: err.message }));
  },
  createFriends({ body }, res) {
    friends.create({ name: body.name, email: body.email })
      .then((userDataDB) => res.json(userDataDB))
      .catch((err) => res.status(400).json({ err: err.message }));
  },
  updateFriends(req, res) {
    console.log(req.params.friendsId);
    friends.findOneAndUpdate(
      { _id: req.params.friendsId },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(400).json({ err: err.message }));
  },
  deleteFriends({ params }, res) {
    console.log(params);
    friends.findOneAndDelete({ _id: params.friendsId })
      .then((userDataDB) => {
        if (!userDataDB) {
          return res
            .status(404)
            .json({ message: user404Message(params.friendsId) });
        }
        res.json(userDataDB);
      })
      .catch((err) => res.status(400).json({ err: err.message }));
  },
  addFriend({ params }, res) {
    friends.findOneAndUpdate(
      { _id: params.friendsId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((userDataDB) => res.json(userDataDB))
      .catch((err) => res.status(400).json({ err: err.message }));
  },
  removeFriend({ params }, res) {
    friends.findOneAndUpdate(
      { _id: params.friendsId },
      { $pull: { friends: params.friendsId } }
    )
      .then((userDataDB) =>
        res
          .status(200)
          .json(userDataDB)
          .json(user204Message(params.friendId, "User"))
      )
      .catch((err) => res.json({ err: err.message }));
  },
};
module.exports=friendController