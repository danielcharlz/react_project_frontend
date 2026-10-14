const express = require('express');
const User = require('../models/User');
const ConnectionRequest = require('../models/ConnectionRequest');
const isObjectId = require('../utils/isObjectId');

const router = express.Router();

// POST /connect
// Body: { "fromUserId": "<id>", "toUserId": "<id>" }
// Saves "fromUserId sent a connection request to toUserId".
//   201 -> new request saved
//   200 -> request already existed (no duplicate is created)
//   400 -> invalid input, 404 -> user not found
router.post('/', async (req, res) => {
  const { fromUserId, toUserId } = req.body || {};

  if (!isObjectId(fromUserId) || !isObjectId(toUserId)) {
    return res.status(400).json({ message: 'fromUserId and toUserId must be valid user IDs' });
  }

  if (fromUserId === toUserId) {
    return res.status(400).json({ message: 'You cannot send a connection request to yourself' });
  }

  // Both users must exist.
  const foundUsers = await User.countDocuments({ _id: { $in: [fromUserId, toUserId] } });
  if (foundUsers !== 2) {
    return res.status(404).json({ message: 'User not found' });
  }

  try {
    await ConnectionRequest.create({ from: fromUserId, to: toUserId });
    return res.status(201).json({ message: 'Connection request sent', requested: true });
  } catch (err) {
    // 11000 = duplicate key: the unique (from, to) index rejected a second request.
    // That is fine - the request already exists, so we report success without saving again.
    if (err.code === 11000) {
      return res.status(200).json({ message: 'Connection request already sent', requested: true });
    }
    throw err; // anything else goes to the error handler (500)
  }
});

module.exports = router;
