const isDevelopment = import.meta.env.MODE === 'development';
const isTest = import.meta.env.MODE === 'test';

/**
 * Centralized logging utility
 * Only logs in development mode to prevent information leakage in production
 */
const logger = {
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },

  info: (...args) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },

  warn: (...args) => {
    if (isDevelopment || isTest) {
      console.warn(...args);
    }
  },

  error: (...args) => {
    // Always log errors, but sanitize in production
    if (isDevelopment || isTest) {
      console.error(...args);
    } else {
      // In production, log only error messages without sensitive data
      const sanitized = args.map(arg => {
        if (arg instanceof Error) {
          return arg.message;
        }
        if (typeof arg === 'object') {
          return '[Object]';
        }
        return arg;
      });
      console.error(...sanitized);
    }
  },

  debug: (...args) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },
};

export default logger;
