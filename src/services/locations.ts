import { axiosInstance } from "../axios/instance";

interface LocationData {
  name: string;
  address: string;
  zipcode: string;
  city: string;
}

export const getLocations = async () => {
  const response = await axiosInstance.get("/locations", {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data;
}

export const getLocationById = async (id: number) => {
  const response = await axiosInstance.post("/locations/" + id)
  return response.data
}

export const createLocation = async (data: LocationData) => {
  const response = await axiosInstance.post("/location", data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data;
}

export const getLocation = async () => {
  const response = await axiosInstance.get("/locations", {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data;
}