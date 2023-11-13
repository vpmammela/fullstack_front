/* eslint-disable no-useless-catch */
import axios from 'axios';

export const exampleFetch = async () => {
  try {
    // const response = await axios.get('http://localhost:8001/api/v1/test');
    const response = await axios.get('https://fullstack-backend-w94q.onrender.com/api/v1/test');
    return response.data;
  } catch (error) {
    throw error;
  }
};