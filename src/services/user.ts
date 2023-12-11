import { axiosInstance } from "../axios/instance"

export const getUserById = async (id: number) => {
  const response = await axiosInstance.get(`/user/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data
}