import { axiosInstance } from "../axios/instance";

// Enum for inspection types
enum InspectionType {
    CONTINUOUS = 'Jatkuva katselmointi',
    SEMESTER = 'Lukukausi- ja vuosikatselmoinni',
    MANAGEMENT = 'Toimintamallin ja johtamisen katselmoinnit',
    SAFETY = 'Turvallisuuskatselmoinnit',
  }

export const getEnvironmentReportsData = async (environment_id: number| null, selectedInspectionType: InspectionType) => {
    let inspectionType = ''; 
    if (selectedInspectionType =='Jatkuva katselmointi'){
       inspectionType = 'continuous'
    }
    else if (selectedInspectionType =='Lukukausi- ja vuosikatselmoinni'){
        inspectionType = 'semester'
    }
    else if (selectedInspectionType =='Toimintamallin ja johtamisen katselmoinnit'){
        inspectionType = 'management'
    } 
    else {
        inspectionType = 'safety'
    }

    const response = await axiosInstance.get(`report/environment/${environment_id}/${inspectionType}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    return response.data;
    
  }


export const getInspectionTargetReportsData = async (inspectiontarget_id: number| null, selectedInspectionType: InspectionType | null) => {
    
    let inspectionType = ''; 
    if (selectedInspectionType =='Jatkuva katselmointi'){
       inspectionType = 'continuous'
    }
    else if (selectedInspectionType =='Lukukausi- ja vuosikatselmoinni'){
        inspectionType = 'semester'
    }
    else if (selectedInspectionType =='Toimintamallin ja johtamisen katselmoinnit'){
        inspectionType = 'management'
    } 
    else {
        inspectionType = 'safety'
    }
const response = await axiosInstance.get(`report/inspectiontarget/${inspectiontarget_id}/${inspectionType}`, {
    headers: {
    'Content-Type': 'application/json',
    },
})
return response.data;
}