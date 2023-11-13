import axios from "axios";
//const baseUrl = "http://localhost:8001/api/v1/login";
const baseUrl= "https://fullstack-backend-w94q.onrender.com/api/v1/login";

interface LoginCredentials {
  username: string;
  password: string;
}

const login = async (credentials: LoginCredentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;     // This will include the "role" if it's sent by the backend.
};

export default { login };