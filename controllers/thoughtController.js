const { Thought, User } = require("../models");

const thoughtControllers = {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thoughtDataDB) => res.json(thoughtDataDB))
      .catch((err) => res.status(500).json({ err: err.message }));
  },
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thoughtDataDB) =>
        thoughtDataDB
          ? res.json(thoughtDataDB)
          : res
              .status(404)
              .json({ message: thought404Message(params.thoughtId) })
      )
      .catch((err) => res.status(404).json({ err: err.message }));
  },
  createThought({ body }, res) {
    console.log(body);
    Thought.create({ thoughtText: body.thoughtText, username: body.username })
      .then(({ _id }) =>
        User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        )
      )
      .then((thoughtDataDB) => res.json(thoughtDataDB))
      .catch((err) => res.status(400).json({ err: err.message }));
  },
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then((thoughtDataDB) =>
        thoughtDataDB
          ? res.json(thoughtDataDB)
          : res
              .status(404)
              .json({ message: thought404Message(params.thoughtId) })
      )
      .catch((err) => res.status(400).json({ err: err.message }));
  },
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then((thoughtDataDB) => {
      if (!thoughtDataDB) {
        return res
          .status(404)
          .json({ message: user404Message(params.thoughtId) });
      }
      res.json(thoughtDataDB);
    });
  },
  createReaction({ params, body }, res) {
    console.log(body);
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .populate("reactions")
      .select("-__v")
      .then((thoughtDataDB) =>
        !thoughtDataDB
          ? res.status(404).json({ message: "No thought found with this ID" })
          : res.json(thoughtDataDB)
      )
      .catch((err) => res.status(500).json(err));
  },
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { _id: params.reactionId } } },
      { new: true }
    )
      .then((thoughtDataDB) =>
        !thoughtDataDB
          ? res.json(reaction200Message(params.thoughtId))
          : res.json(thoughtDataDB)
      )
      .catch((err) => res.status(404).json({ err: err.message }));
  },
};
module.exports=thoughtControllers