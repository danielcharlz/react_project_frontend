const mongoose = require('mongoose');

// Connects to MongoDB using the MONGODB_URI from the .env file.
// Used by both server.js and seed.js, so the logic lives in one place.
async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not set. Copy .env.example to .env first.');
  }

  await mongoose.connect(uri);
  console.log(`MongoDB connected: ${mongoose.connection.name}`);
}

module.exports = connectDB;
