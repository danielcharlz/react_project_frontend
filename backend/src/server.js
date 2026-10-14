// Load .env first, before any file reads process.env.
require('dotenv').config({ quiet: true });

const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const connectRouter = require('./routes/connect');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // allow requests from the Expo app
app.use(express.json()); // read JSON request bodies (used by POST /connect)

// Serve profile and post images, e.g. http://<host>:4000/images/posts/post1.png
app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));

// Optional: set API_DELAY_MS in .env to slow every API response,
// which makes the app's loading states easy to see and test.
const delayMs = Number(process.env.API_DELAY_MS) || 0;
if (delayMs > 0) {
  app.use((req, res, next) => setTimeout(next, delayMs));
}

// Simple check that the server is up.
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/connect', connectRouter);

// These two must come last.
app.use(notFound);
app.use(errorHandler);

async function start() {
  try {
    // Connect to the database first, so the API never runs without it.
    await connectDB();
    // '0.0.0.0' = accept connections from other devices on the network (your phone).
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
