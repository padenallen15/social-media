const { Thought, User, Reaction } = require("../models");

const reactionController = {
  // get all reactions
  getAllReactions(req, res) {
    Reaction.find({})
      .then((dbReactionData) => res.json(dbReactionData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one reaction by id
  getReactionById({ params }, res) {
    Reaction.findOne({ _id: params.id })
      .then((dbReactionData) => res.json(dbReactionData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // update reaction by id
  updateReaction({ params, body }, res) {
    Reaction.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbReactionData) => {
        if (!dbReactionData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbReactionData);
      })
      .catch((err) => res.json(err));
  },

  // delete reaction
  deleteReaction({ params }, res) {
    Reaction.findOneAndDelete({ _id: params.id })
      .then((dbReactionData) => res.json(dbReactionData))
      .catch((err) => res.json(err));
  },

  // add reaction to thought
  addReaction({ params, body }, res) {
    console.log(params);
    Reaction.create(body)
      .then(({ _id }) => {
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        console.log(dbThoughtData);
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
//remove reactions
  removeReaction({ params }, res) {
    Reaction.findOneAndDelete({ _id: params.reactionId })
      .then(deletedReaction => {
        if (!deletedReaction) {
          return res.status(404).json({ message: 'No reaction with this id!' });
        }
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: params.reactionId } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },  
};

module.exports = reactionController;
