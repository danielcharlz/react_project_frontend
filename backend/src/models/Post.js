const mongoose = require('mongoose');

// A feed post. "author" stores only the user's _id (a reference);
// .populate('author') swaps it for the full user document when reading.
const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  image: { type: String }, // path served by Express, e.g. /images/posts/post1.png
  likesCount: { type: Number, default: 0 },
  sharesCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);
