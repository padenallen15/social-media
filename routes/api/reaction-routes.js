const router = require('express').Router();
const {
  getAllReactions,
  getReactionById,
  addReaction,
  updateReaction,
  removeReaction
} = require('../../controllers/reaction-controller');

// /api/reactions/
router.route('/').get(getAllReactions);

// /api/reactions/:reactionId
router
  .route('/:id')
  .get(getReactionById)
  .put(updateReaction)
  

// /api/reactions/<userId>/<thoughtId>
router.route('/:userId/:thoughtId').post(addReaction);

// /api/reactions/<reactionId>/<thoughtId>
router.route('/:reactionId/:thoughtId').delete(removeReaction);

module.exports = router;
