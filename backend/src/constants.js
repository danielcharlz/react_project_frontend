// The first seeded user is treated as the logged-in user (there is no auth).
// The seed script always gives this user the same fixed _id, so the ID
// hardcoded in the mobile app stays valid every time the database is re-seeded.
const CURRENT_USER_ID = '64a000000000000000000001';

module.exports = { CURRENT_USER_ID };
