import { jwtDecode } from 'jwt-decode';

const isTokenExpired = (
  accessToken: string | null,
  refreshToken: string | null
) => {
  if (!accessToken || !refreshToken) {
    return true;
  }

  try {
    const decodedAccessToken = jwtDecode(accessToken);
    const accessTokenExpired = decodedAccessToken.exp! * 1000 < Date.now();
    
    // Only check if access token is expired
    // If refresh token is expired, we'll handle that in the refresh process
    return accessTokenExpired;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

export default isTokenExpired;
