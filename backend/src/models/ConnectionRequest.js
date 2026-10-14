const mongoose = require('mongoose');

// One document = "user `from` sent a connection request to user `to`".
// Kept in its own collection (not inside User) so it is easy to query
// and so MongoDB itself can block duplicates (see the index below).
const connectionRequestSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

// Unique compound index: the same (from, to) pair can only exist once.
// Even if two taps reach the server at the same moment, the database
// rejects the second insert with error code 11000.
connectionRequestSchema.index({ from: 1, to: 1 }, { unique: true });

module.exports = mongoose.model('ConnectionRequest', connectionRequestSchema);
