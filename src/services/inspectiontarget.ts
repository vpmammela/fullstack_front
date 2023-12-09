import { axiosInstance } from "../axios/instance";

interface InspectionTargetData {
  name: string,
  description: string,
  environment_id: number,
  inspectiontargettype_id: number
}

// Creates inspectiontarget in backend and returns inspectiontarget id and name
export const createInspectionTarget= async (data: InspectionTargetData)=>{
  console.log("created target:", data)
  const response = await axiosInstance.post("/inspectiontarget", data, {
      headers: {
        'Content-Type': 'application/json',
      },
  })
  return response.data;
}


export const getInspectionTargets = async () => {
  const response = await axiosInstance.get("/inspectiontargets", {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data;
}

export const getInspectionTargetById = async (id: number) => {
  const response = await axiosInstance.get(`inspectiontargets/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log("target by id: ", response.data)
  return response.data;
}

export const getInspectionTargetsByEnviromentsId = async (environment_id: number) => {
  const response = await axiosInstance.get(`environment/${environment_id}/inspectiontargets`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log("targets: ", response.data)
  return response.data;
}