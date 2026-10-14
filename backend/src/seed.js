// Seed script: run with `npm run seed`.
// Clears the collections and inserts 5 users and 5 posts.
// Note: this also clears existing connection requests, so every
// "Requested" button goes back to "Connect" after re-seeding.
require('dotenv').config({ quiet: true });
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Post = require('./models/Post');
const ConnectionRequest = require('./models/ConnectionRequest');
const { CURRENT_USER_ID } = require('./constants');

// Fixed IDs so the app's hardcoded CURRENT_USER_ID always matches user 1.
const ids = {
  arjun: CURRENT_USER_ID,
  docconnect: '64a000000000000000000002',
  priya: '64a000000000000000000003',
  careplus: '64a000000000000000000004',
  meera: '64a000000000000000000005',
};

const users = [
  {
    _id: ids.arjun,
    name: 'Dr. Arjun Mehta',
    occupation: 'Cardiology',
    avatar: '/images/avatars/arjun.png',
    connectionsCount: 2,
  },
  {
    _id: ids.docconnect,
    name: 'Docconnect',
    occupation: 'Healthcare Technology',
    avatar: '/images/avatars/docconnect.png',
    connectionsCount: 2,
  },
  {
    _id: ids.priya,
    name: 'Dr. Priya Sharma',
    occupation: 'Pediatrics',
    avatar: '/images/avatars/priya.png',
    connectionsCount: 2,
  },
  {
    _id: ids.careplus,
    name: 'CarePlus Clinic',
    occupation: 'General Practice',
    avatar: '/images/avatars/careplus.png',
    connectionsCount: 2,
  },
  {
    _id: ids.meera,
    name: 'Dr. Meera Nair',
    occupation: 'Psychiatry',
    avatar: '/images/avatars/mindcare.png',
    connectionsCount: 2,
  },
];

// Helper: a date `hours` hours before now, so posts have different timestamps.
const hoursAgo = (hours) => new Date(Date.now() - hours * 60 * 60 * 1000);

const posts = [
  {
    author: ids.docconnect,
    content:
      "Welcome to Docconnect! We're building India's largest healthcare professional network. Connect with doctors, nurses, pharmacists, and medical students across the country. Let's transform healthcare collaboration together. 🇮🇳",
    image: '/images/posts/post5.png',
    likesCount: 5,
    sharesCount: 3,
    createdAt: hoursAgo(1),
  },
  {
    author: ids.careplus,
    content:
      'Caring for our seniors is a privilege. Our home-care team makes sure your loved ones get all the support they need and feel at home.',
    image: '/images/posts/post1.png',
    likesCount: 5,
    sharesCount: 3,
    createdAt: hoursAgo(3),
  },
  {
    author: ids.arjun,
    content:
      'Not all heroes wear capes. Some wear scrubs. A big thank you to every nurse and doctor working through the night shift this week.',
    image: '/images/posts/post3.png',
    likesCount: 12,
    sharesCount: 4,
    createdAt: hoursAgo(6),
  },
  {
    author: ids.docconnect,
    content:
      'Healthcare Professional Wellness Week starts Tuesday, January 9. Your mental health matters as much as your patients. Take a break, breathe, and check in with your colleagues.',
    image: '/images/posts/post2.png',
    likesCount: 8,
    sharesCount: 2,
    createdAt: hoursAgo(24),
  },
  {
    author: ids.meera,
    content:
      "Between memory and forgetting, there is presence. On World Alzheimer's Awareness Day, let's support patients and the families who care for them.",
    image: '/images/posts/post4.png',
    likesCount: 9,
    sharesCount: 1,
    createdAt: hoursAgo(48),
  },
];

async function seed() {
  await connectDB();

  // Start from a clean state every time.
  await ConnectionRequest.deleteMany({});
  await Post.deleteMany({});
  await User.deleteMany({});

  await User.insertMany(users);
  await Post.insertMany(posts);

  // Make sure the unique (from, to) index exists before the app is used.
  await ConnectionRequest.syncIndexes();

  console.log(`Seeded ${users.length} users and ${posts.length} posts.`);
  console.log(`Current user: ${users[0].name} (${CURRENT_USER_ID})`);
}

seed()
  .catch((err) => {
    console.error('Seeding failed:', err.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
