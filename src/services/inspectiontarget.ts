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

export const getInspectionTargetsByEnviromentsId = async (environment_id:string) => {
  const response = await axiosInstance.get(`locations/${environment_id}/environments`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data;
}