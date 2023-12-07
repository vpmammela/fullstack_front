import { axiosInstance } from "../axios/instance";

interface InspectionFormData {
  environment_id: number,
  inspectiontarget_id: number,
  inspectiontype: string
}

// Creates inspectionform in backend and returns inspectionform id and name
export const createInspectionForm = async (data: InspectionFormData)=>{
  console.log("created form:", data)
  const response = await axiosInstance.post("/inspectionform", data, {
      headers: {
        'Content-Type': 'application/json',
      },
  })
  return response.data;
}


export const getInspectionForms = async () => {
  const response = await axiosInstance.get("/inspectionforms", {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data;
}