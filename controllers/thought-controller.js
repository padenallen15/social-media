const { Thought, User } = require("../models");

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // update thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },

  // add thought to user
  addThought({ params, body }, res) {
    console.log(params);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        console.log(dbUserData);
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // // remove Thought
  // removeThought({ params }, res) {
  //   Thought.findOneAndDelete({ _id: params.ThoughtId })
  //     .then((deletedThought) => {
  //       if (!deletedThought) {
  //         return res.status(404).json({ message: "No Thought with this id!" });
  //       }
  //       return User.findOneAndUpdate(
  //         { _id: params.userId },
  //         { $pull: { thoughts: params.ThoughtId } },
  //         { new: true }
  //       );
  //     })
  //     .then((dbUserData) => {
  //       if (!dbUserData) {
  //         res.status(404).json({ message: "No user found with this id!" });
  //         return;
  //       }
  //       res.json(dbUserData);
  //     })
  //     .catch((err) => res.json(err));
  // },

  //   // remove reply
  //   removeReply({ params }, res) {
  //     Thought.findOneAndUpdate(
  //       { _id: params.ThoughtId },
  //       { $pull: { replies: { replyId: params.replyId } } },
  //       { new: true }
  //     )
  //       .then(dbUserData => res.json(dbUserData))
  //       .catch(err => res.json(err));
  //   }
};

module.exports = thoughtController;
