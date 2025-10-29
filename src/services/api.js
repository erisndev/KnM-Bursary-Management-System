import { getToken, clearAuth } from './auth';

const baseAPI = import.meta.env.VITE_BASE_API || '';

if (!baseAPI && import.meta.env.MODE !== 'test') {
  console.error('VITE_BASE_API environment variable is not defined');
}

class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Custom fetch wrapper with timeout, retry, and error handling
 */
async function fetchWithTimeout(url, options = {}, timeout = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new APIError('Request timeout. Please try again.', 408);
    }
    throw error;
  }
}

/**
 * Main API request handler
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${baseAPI}${endpoint}`;
  const token = getToken();

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'include',
  };

  // Don't set Content-Type for FormData
  if (options.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  try {
    const response = await fetchWithTimeout(url, config);

    // Handle 401 Unauthorized - token expired or invalid
    if (response.status === 401) {
      clearAuth();
      window.location.href = '/login';
      throw new APIError('Session expired. Please login again.', 401);
    }

    // Parse response
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new APIError(
        data.message || data.error || 'Request failed',
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    // Network errors
    if (error.message === 'Failed to fetch') {
      throw new APIError('Network error. Please check your connection.', 0);
    }
    
    throw new APIError(error.message || 'An unexpected error occurred', 500);
  }
}

// API Methods
export const api = {
  // Auth endpoints
  auth: {
    login: (credentials) => apiRequest('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
    
    register: (userData) => apiRequest('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
    
    forgotPassword: (email) => apiRequest('/users/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
    
    resetPassword: (token, password) => apiRequest('/users/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    }),
  },

  // Application endpoints
  applications: {
    create: (formData) => apiRequest('/applications/create', {
      method: 'POST',
      body: formData, // FormData object
    }),
    
    getByUserId: (userId) => apiRequest(`/applications/user/${userId}`),
    
    getById: (applicationId) => apiRequest(`/applications/${applicationId}`),
    
    getNotes: (applicationId) => apiRequest(`/applications/${applicationId}/notes`),
    
    update: (applicationId, data) => apiRequest(`/applications/${applicationId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  },

  // User endpoints
  users: {
    getProfile: (userId) => apiRequest(`/users/${userId}`),
    
    updateProfile: (userId, data) => apiRequest(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  },
};

export { APIError };
export default api;
