// apiRequest.js
import axios from 'axios';
import { useCookies } from 'react-cookie';

const BASE_URL = 'https://workmanager-srijonashraf.vercel.app/api/v1';

export const UserLoginRequest = async (email, password) => {
  const [cookies, setCookie] = useCookies(['token']);

  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });

    if (response.data.status === 'success') {
      const token = response.data.data;

      // Set the token in cookies with an expiration time (in seconds)
      setCookie('token', token, { expires: new Date(Date.now() + 60 * 60 * 24 * 1000) }); // Expires in 24 hours
    }

    return response.data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const isLoggedIn = () => {
  const [cookies] = useCookies(['token']);
  const token = cookies.token;
  return !!token;
};
