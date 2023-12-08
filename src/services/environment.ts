import { axiosInstance } from "../axios/instance";

interface EnviromentTypeData {
    name: string;
  }
interface EnviromentData {
    name:string;
    description:string;
    location_id: number;
    environmenttype_id: number;
   
}



export const createEnvironmentType = async (data:EnviromentTypeData)=>{
    const response = await axiosInstance.post("/environment/type", data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data;
}

export const createEnvironment = async (data:EnviromentData)=>{
  console.log(data)
    const response = await axiosInstance.post("/environment", data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data;
}


export const getEnvironmentType = async () => {
  const response = await axiosInstance.get("/environment/type", {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data;
}

export const getEnvironmentByLocationId = async (location_id:string) => {
  const response = await axiosInstance.get(`locations/${location_id}/environments`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log("environments: ", response.data)
  return response.data;
}