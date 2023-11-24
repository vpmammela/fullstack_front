import axios from "axios";


interface LoginCredentials {
  username: string;
  password: string;
}

const loginService = async (data: LoginCredentials) => {
  const response = await axios.post("/auth/login", data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  return response.data
}

export default loginService