// Base URL for the backend API
// In development, this points to localhost:5000
// In production, set VITE_API_URL in your .env file to your deployed backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Generic fetch wrapper with error handling.
 * Automatically sends credentials (cookies) with every request.
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    credentials: 'include', // Send HTTP-only cookies automatically
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Attach Bearer token from localStorage as fallback (for non-cookie environments)
  const token = localStorage.getItem('cb_token');
  if (token && !config.headers['Authorization']) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'An unexpected error occurred');
  }

  return data;
}

// ─── Auth API ──────────────────────────────────────────────────────────────────

export const authAPI = {
  /**
   * Register a new user
   * @param {{ name: string, email: string, password: string }} userData
   */
  register: (userData) =>
    apiFetch('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  /**
   * Login with email and password
   * @param {{ email: string, password: string }} credentials
   */
  login: (credentials) =>
    apiFetch('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  /**
   * Logout the current user
   */
  logout: () =>
    apiFetch('/logout', {
      method: 'POST',
    }),

  /**
   * Get the current user's profile (protected)
   */
  getProfile: () => apiFetch('/profile'),
};

// ─── Crypto API ───────────────────────────────────────────────────────────────

export const cryptoAPI = {
  /**
   * Get all tradable cryptocurrencies
   */
  getAll: () => apiFetch('/crypto'),

  /**
   * Get top gainers
   */
  getGainers: () => apiFetch('/crypto/gainers'),

  /**
   * Get newest listings
   */
  getNew: () => apiFetch('/crypto/new'),

  /**
   * Add a new cryptocurrency
   * @param {{ name: string, symbol: string, price: number, image: string, change24h: number }} cryptoData
   */
  add: (cryptoData) =>
    apiFetch('/crypto', {
      method: 'POST',
      body: JSON.stringify(cryptoData),
    }),
};

export default { authAPI, cryptoAPI };
