import { axiosInstance } from "../axios/instance";


export const getReports = async (type: string) => {
  const response = await axiosInstance.get(`/report/${type}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data;
}