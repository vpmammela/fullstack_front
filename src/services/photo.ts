import { axiosInstance } from "../axios/instance";

export const createPhoto = async (id: number, formData: FormData) => {
  const response = await axiosInstance.post(`/inspectionform/${id}/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data;
}
