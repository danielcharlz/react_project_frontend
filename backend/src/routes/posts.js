const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

// GET /posts
// Returns the 5 seeded posts, newest first, each with its author's details.
router.get('/', async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('author', 'name occupation avatar'); // replace author id with these user fields

  res.json({ posts });
});

module.exports = router;
