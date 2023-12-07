import { axiosInstance } from "../axios/instance";

interface InspectionResultData {
  value: number;
  note: string;
  title: string;
  inspectionform_id: number;
}

export const createInspectionResult = async (data: InspectionResultData)=>{
  console.log("created result:", data)
  const response = await axiosInstance.post("/inspectionresult", data, {
      headers: {
        'Content-Type': 'application/json',
      },
  })
  return response.data;
}


export const getInspectionResults = async () => {
  const response = await axiosInstance.get("/inspectionresults", {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data;
}