const mongoose = require('mongoose');

// A person (or organisation) shown in the app.
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  occupation: { type: String, required: true, trim: true },
  avatar: { type: String, required: true }, // path served by Express, e.g. /images/avatars/arjun.png
  connectionsCount: { type: Number, default: 0 }, // shown as "2 Connects" in the design
});

module.exports = mongoose.model('User', userSchema);
