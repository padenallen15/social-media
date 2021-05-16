const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  deleteThought,
//   addReply,
//   removeReply
} = require('../../controllers/thought-controller');

// /api/thoughts/
router.route('/').get(getAllThoughts);

// /api/thoughts/:thoughtId
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);


module.exports = router;
