const API_BASE_URL = 'http://localhost:3001';

export default {
  API_BASE_URL,
  // Add other API endpoints here
  ENDPOINTS: {
    AUTH: {
      LOGIN: `${API_BASE_URL}/api/auth/login`,
      REGISTER: `${API_BASE_URL}/api/auth/register`
    },
    // Add more endpoints as needed
  }
};
