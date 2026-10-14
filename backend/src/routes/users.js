const express = require('express');
const User = require('../models/User');
const ConnectionRequest = require('../models/ConnectionRequest');
const isObjectId = require('../utils/isObjectId');

const router = express.Router();

// GET /users?currentUserId=<id>
// Returns:
//   currentUser - the "logged in" user's profile (used by the Home header)
//   users       - everyone else, each with `requested: true/false`
//                 telling the app whether currentUser already sent them a request.
router.get('/', async (req, res) => {
  const { currentUserId } = req.query;

  if (!isObjectId(currentUserId)) {
    return res.status(400).json({ message: 'A valid currentUserId query parameter is required' });
  }

  const currentUser = await User.findById(currentUserId);
  if (!currentUser) {
    return res.status(404).json({ message: 'Current user not found' });
  }

  // Everyone except the current user (you can't connect with yourself).
  const otherUsers = await User.find({ _id: { $ne: currentUserId } }).sort({ _id: 1 });

  // All requests the current user has already sent.
  const sentRequests = await ConnectionRequest.find({ from: currentUserId });
  const requestedIds = sentRequests.map((request) => request.to.toString());

  const users = otherUsers.map((user) => ({
    ...user.toObject(),
    requested: requestedIds.includes(user._id.toString()),
  }));

  res.json({ currentUser, users });
});

module.exports = router;
