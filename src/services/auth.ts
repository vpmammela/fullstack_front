import axios from "axios";


interface LoginCredentials {
  username: string;
  password: string;
}

export const loginService = async (data: LoginCredentials) => {
  const response = await axios.post("/auth/login", data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  return response.data
}

export const getAccount = async () => {
  const response = await axios.get("/auth/account", {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  return response.data
}

export const logoutUser = async () => {
  const response = await axios.post("/auth/logout", {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  return response.data
}
