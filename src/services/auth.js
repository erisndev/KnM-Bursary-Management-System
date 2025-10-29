import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'token';
const USER_ID_KEY = 'userId';
const APPLICATION_ID_KEY = 'applicationId';

/**
 * Get token from localStorage
 */
export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    return null;
  }
}

/**
 * Set token in localStorage
 */
export function setToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get user ID from localStorage
 */
export function getUserId() {
  try {
    return localStorage.getItem(USER_ID_KEY);
  } catch (error) {
    return null;
  }
}

/**
 * Set user ID in localStorage
 */
export function setUserId(userId) {
  try {
    localStorage.setItem(USER_ID_KEY, userId);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get application ID from localStorage
 */
export function getApplicationId() {
  try {
    return localStorage.getItem(APPLICATION_ID_KEY);
  } catch (error) {
    return null;
  }
}

/**
 * Set application ID in localStorage
 */
export function setApplicationId(applicationId) {
  try {
    localStorage.setItem(APPLICATION_ID_KEY, applicationId);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Clear all auth data from localStorage
 */
export function clearAuth() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(APPLICATION_ID_KEY);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Decode JWT token and return payload
 */
export function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token) {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    
    if (!decoded.exp) {
      return false; // No expiration set
    }

    // Check if token is expired (exp is in seconds, Date.now() is in milliseconds)
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true; // If we can't decode, consider it expired
  }
}

/**
 * Validate token and return validation result
 */
export function validateToken(token) {
  if (!token) {
    return { valid: false, reason: 'no_token' };
  }

  try {
    const decoded = jwtDecode(token);
    
    // Check expiration
    if (decoded.exp) {
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        return { valid: false, reason: 'expired' };
      }
    }

    // Token is valid
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, reason: 'invalid' };
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
  const token = getToken();
  const validation = validateToken(token);
  return validation.valid;
}

/**
 * Get user ID from token
 */
export function getUserIdFromToken() {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.id || decoded.userId || decoded.sub || null;
  } catch (error) {
    return null;
  }
}

/**
 * Store auth data after login
 */
export function storeAuthData({ token, userId, applicationId }) {
  if (token) setToken(token);
  if (userId) setUserId(userId);
  if (applicationId) setApplicationId(applicationId);
}

/**
 * Get all auth data
 */
export function getAuthData() {
  return {
    token: getToken(),
    userId: getUserId(),
    applicationId: getApplicationId(),
    isAuthenticated: isAuthenticated(),
  };
}
