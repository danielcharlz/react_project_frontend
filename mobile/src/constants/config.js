import Constants from 'expo-constants';

// There is no login. The first seeded user is "me".
// Same fixed ID as backend/src/constants.js.
export const CURRENT_USER_ID = '64a000000000000000000001';

const API_PORT = 4000;

// Works out where the backend is running.
// 1. EXPO_PUBLIC_API_URL in mobile/.env wins if you set it.
// 2. Otherwise use the IP of the computer running `expo start`
//    (a phone can't use "localhost" - that would mean the phone itself).
// 3. Fall back to localhost (web browser / iOS simulator).
function getApiUrl() {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  const hostUri = Constants.expoConfig?.hostUri; // e.g. "192.168.1.23:8081"
  if (hostUri) {
    const computerIp = hostUri.split(':')[0];
    return `http://${computerIp}:${API_PORT}`;
  }

  return `http://localhost:${API_PORT}`;
}

export const API_URL = getApiUrl();
