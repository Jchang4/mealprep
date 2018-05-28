
// export const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

if (!SERVER_URL) {
  throw new Error('SERVER_URL is required.');
}
