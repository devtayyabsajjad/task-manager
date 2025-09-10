// Environment configuration utility
export const getApiConfig = () => {
  // In production, we'll use relative URLs since frontend and backend are on the same domain
  const isProduction = import.meta.env.PROD;
  
  if (isProduction) {
    // Use relative URLs in production (Vercel deployment)
    const baseUrl = window.location.origin;
    return {
      API_URL: `${baseUrl}/api`,
      API_REGISTER: `${baseUrl}/api/auth/register`,
      API_LOGIN: `${baseUrl}/api/auth/login`,
      API_LOGOUT: `${baseUrl}/api/auth/logout`,
      API_JWT_REFRESH: `${baseUrl}/api/auth/refresh`,
      API_USER: `${baseUrl}/api/user`,
      API_WORKSPACES: `${baseUrl}/api/workspaces`,
      API_BOARDS: `${baseUrl}/api/boards`,
      API_LISTS: `${baseUrl}/api/lists`,
      API_CARDS: `${baseUrl}/api/cards`,
      WS_URL: baseUrl,
    };
  }
  
  // Use environment variables for development
  return {
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:4001/api',
    API_REGISTER: import.meta.env.VITE_API_REGISTER || 'http://localhost:4001/api/auth/register',
    API_LOGIN: import.meta.env.VITE_API_LOGIN || 'http://localhost:4001/api/auth/login',
    API_LOGOUT: import.meta.env.VITE_API_LOGOUT || 'http://localhost:4001/api/auth/logout',
    API_JWT_REFRESH: import.meta.env.VITE_API_JWT_REFRESH || 'http://localhost:4001/api/auth/refresh',
    API_USER: import.meta.env.VITE_API_USER || 'http://localhost:4001/api/user',
    API_WORKSPACES: import.meta.env.VITE_API_WORKSPACES || 'http://localhost:4001/api/workspaces',
    API_BOARDS: import.meta.env.VITE_API_BOARDS || 'http://localhost:4001/api/boards',
    API_LISTS: import.meta.env.VITE_API_LISTS || 'http://localhost:4001/api/lists',
    API_CARDS: import.meta.env.VITE_API_CARDS || 'http://localhost:4001/api/cards',
    WS_URL: import.meta.env.VITE_WS_URL || 'http://localhost:4001',
  };
};

export const apiConfig = getApiConfig();
