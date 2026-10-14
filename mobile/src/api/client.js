import { API_URL, CURRENT_USER_ID } from '../constants/config';

const TIMEOUT_MS = 10000;

// One place for every API call:
// - adds the base URL and JSON headers
// - gives up after 10 seconds instead of loading forever
// - turns network problems and 4xx/5xx responses into an Error
//   with a readable message, so screens only need try/catch.
async function request(path, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
    });
  } catch (err) {
    throw new Error('Could not reach the server. Please check your connection and try again.');
  } finally {
    clearTimeout(timer);
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || `Request failed (${response.status})`);
  }

  return data;
}

// GET /posts -> { posts: [...] }
export function getPosts() {
  return request('/posts');
}

// GET /users -> { currentUser, users: [{ ..., requested }] }
export function getUsers() {
  return request(`/users?currentUserId=${CURRENT_USER_ID}`);
}

// POST /connect -> { message, requested: true }
export function sendConnectRequest(toUserId) {
  return request('/connect', {
    method: 'POST',
    body: JSON.stringify({ fromUserId: CURRENT_USER_ID, toUserId }),
  });
}

// The backend stores image paths like "/images/posts/post1.png".
export function imageUrl(path) {
  return `${API_URL}${path}`;
}
