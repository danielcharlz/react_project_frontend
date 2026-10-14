# DocConnect — React Native Full-Stack Assignment

Two screens from the DocConnect design, backed by a Node.js + Express + MongoDB API.

- **Home** – current user's profile at the top and a scrollable feed of 5 posts from the API, with loading, error (with retry) and empty states.
- **Discover** – a grid of users (name, occupation, profile image) with a **Connect** button. Tapping it saves a connection request in MongoDB and the button changes to **Requested**. The state is loaded from the backend, so it survives refreshes and app restarts.

```
.
├── backend/   Express API + MongoDB (Mongoose) + seed script
└── mobile/    Expo (React Native) app
```

## Prerequisites

- Node.js 20 or newer (tested with Node 24)
- MongoDB running locally (tested with MongoDB Community 9) **or** a MongoDB Atlas connection string
- The **Expo Go** app on your phone, or an Android emulator / iOS simulator
- Phone and computer on the same Wi-Fi network (when using a real phone)

## 1. Backend

```bash
cd backend
npm install
cp .env.example .env        # Windows PowerShell: copy .env.example .env
npm run seed                # inserts 5 users + 5 posts (and clears old requests)
npm run dev                 # starts the API on http://localhost:4000
```

### Environment variables (`backend/.env`)

| Variable       | Example                                      | Purpose                                         |
| -------------- | -------------------------------------------- | ----------------------------------------------- |
| `PORT`         | `4000`                                       | Port the API listens on                         |
| `MONGODB_URI`  | `mongodb://127.0.0.1:27017/brandopedia`      | MongoDB connection string (local or Atlas)      |
| `API_DELAY_MS` | `0`                                          | Optional delay per response, to test loading UI |

> Use `127.0.0.1` rather than `localhost` in `MONGODB_URI` — on some Windows setups `localhost` resolves to IPv6 where MongoDB is not listening.

### Check it works

Open `http://localhost:4000/health` → `{"status":"ok"}`

## 2. Mobile app

```bash
cd mobile
npm install
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS). Press `w` to open it in a browser.

The app finds the backend automatically using the IP address of the computer running `expo start`, so no config is needed in most cases. If the app shows "Could not reach the server":

1. Make sure the backend is running and `http://<your-computer-ip>:4000/health` opens in your **phone's** browser.
2. Allow Node.js through the Windows Firewall on **Private** networks.
3. Or set the URL explicitly: copy `mobile/.env.example` to `mobile/.env`, set `EXPO_PUBLIC_API_URL`, and restart Expo (Android emulator: `http://10.0.2.2:4000`).

## API

There is no login. The first seeded user (**Dr. Arjun Mehta**, id `64a000000000000000000001`) is the current user; this ID is hardcoded in `mobile/src/constants/config.js`. The seed script always gives this user the same ID, so re-seeding never breaks the app.

### `GET /posts`

Returns the 5 posts, newest first, with author details.

```json
{ "posts": [ { "_id": "...", "content": "...", "image": "/images/posts/post5.png",
               "likesCount": 5, "sharesCount": 3, "createdAt": "...",
               "author": { "_id": "...", "name": "Docconnect", "occupation": "Healthcare Technology", "avatar": "/images/avatars/docconnect.png" } } ] }
```

### `GET /users?currentUserId=<id>`

Returns the current user's profile and every other user, each with `requested` = whether the current user already sent them a request.

```json
{ "currentUser": { "_id": "...", "name": "Dr. Arjun Mehta", ... },
  "users": [ { "_id": "...", "name": "Dr. Priya Sharma", "occupation": "Pediatrics", "avatar": "...", "connectionsCount": 2, "requested": false } ] }
```

Errors: `400` invalid/missing `currentUserId`, `404` user not found.

### `POST /connect`

Body: `{ "fromUserId": "<id>", "toUserId": "<id>" }`

| Status | Meaning                                                        |
| ------ | -------------------------------------------------------------- |
| `201`  | Request saved                                                  |
| `200`  | Request already existed — nothing new is saved (no duplicates) |
| `400`  | Invalid IDs, or sending a request to yourself                  |
| `404`  | One of the users does not exist                                |

Duplicates are prevented by a **unique compound index on `{ from, to }`** in the `connectionrequests` collection, so even simultaneous taps can only create one document.

Example:

```bash
curl -X POST http://localhost:4000/connect -H "Content-Type: application/json" -d "{\"fromUserId\":\"64a000000000000000000001\",\"toUserId\":\"64a000000000000000000003\"}"
```

Images are served statically from `backend/public/images` at `/images/...`.

## Data model

| Collection           | Fields                                                                 |
| -------------------- | ---------------------------------------------------------------------- |
| `users`              | `name`, `occupation`, `avatar`, `connectionsCount`                     |
| `posts`              | `author` (ref → users), `content`, `image`, `likesCount`, `sharesCount`, `createdAt` |
| `connectionrequests` | `from` (ref → users), `to` (ref → users), `createdAt`, `updatedAt` — unique on `{from, to}` |

## How the "Requested" state persists

1. Tapping **Connect** shows a spinner and sends `POST /connect`.
2. Only when the server answers `200`/`201` does the button become **Requested**. On a network or server error it stays **Connect** and an error message is shown.
3. The Discover screen loads `GET /users` every time it opens (and on pull-to-refresh). The backend works out `requested` from the `connectionrequests` collection, so after closing and reopening the app the state comes straight from MongoDB.

## Testing tips

- **Loading state:** set `API_DELAY_MS=3000` in `backend/.env` and restart the backend.
- **Error state:** stop the backend and reopen/refresh a screen — an error with a **Try again** button appears.
- **Reset requests:** `npm run seed` in `backend/`.

## Notes on scope

- Only the Home and Discover screens are built. The design's Chat tab, search, the "+" (create post) button, likes/shares and the image carousel are outside the assignment scope; the search bar and "+" button are shown for visual accuracy only.
- The DocConnect logo is drawn with DM Sans text, and the small "connects" icon is a simple SVG, because neither was included in the supplied assets.
- No authentication, by design.

## Tech

- **Mobile:** Expo SDK 57, React Native, React Navigation (bottom tabs), react-native-svg (+ svg transformer), DM Sans via `@expo-google-fonts/dm-sans`
- **Backend:** Node.js, Express 5, Mongoose 9, MongoDB
