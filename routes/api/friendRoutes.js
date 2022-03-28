const router = require('express').Router();

const {
  getAllFriends,
  getSingleFriends,
  createFriends,
  updateFriends,
  deleteFriends,
  addFriend,
  removeFriend,
} = require('../../controllers/friendController');

router
.route('/')
.get(getAllFriends)
.post(createFriends);
router
.route('/:friendId')
.get(getSingleFriends)
.put(updateFriends)
.delete(deleteFriends);

router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;