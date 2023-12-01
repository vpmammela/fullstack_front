import { axiosInstance } from "../axios/instance";

export async function getLocations() {
  const response = await axiosInstance.get("/locations/")
  return response.data;
}