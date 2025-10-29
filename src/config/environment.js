// Environment configuration
const config = {
  baseAPI: import.meta.env.VITE_BASE_API || '',
  baseURL: import.meta.env.VITE_BASE_URL || '',
  emailJS: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  },
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
  isTest: import.meta.env.MODE === 'test',
};

// Validate required environment variables
if (!config.baseAPI && config.isProduction) {
  throw new Error('VITE_BASE_API is required in production');
}

export default config;
