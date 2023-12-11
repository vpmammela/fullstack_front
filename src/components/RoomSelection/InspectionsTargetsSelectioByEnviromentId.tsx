import { useState, useEffect } from "react"
import {getInspectionTargetsByEnviromentsId} from'../../services/inspectiontarget'


const InspectionsTargetsSelectionByEnvironmentId: React.FC<{ setInspectiontarget_id: React.Dispatch<React.SetStateAction<number | null>>, environment_id: number | null }> = ({ setInspectiontarget_id, environment_id}) => {
    const [selectedInspectionTarget, setSelectedInspectionTarget] = useState('');
    const [inspectionTargetArray, setInspectionTargetArray] = useState<InspectionTargetData[]>([]);


    interface InspectionTargetData {
        id: number;
        name: string;
      }

      useEffect(() => {
        const fetchEnvironment = async () => {
          console.log("InspectionsTargwr Selection")
          try {
            const InspectionTargetData: { inspectiontargets: InspectionTargetData[] } = await getInspectionTargetsByEnviromentsId(environment_id!);
            const names = InspectionTargetData.inspectiontargets
            console.log("#### names",InspectionTargetData.inspectiontargets)
            setInspectionTargetArray(names);
          } catch (error) {
            console.error('Error fetching locations:', error);
          }
        };
        fetchEnvironment();
    }, [environment_id]);
    const handleEnvironmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const numericValue = parseInt(selectedValue, 10);
        setSelectedInspectionTarget(selectedValue);
        setInspectiontarget_id(numericValue);
      };
  
      return(
          <div className="selectStyle">
              <label>Valitse tila.</label>
              <select value={selectedInspectionTarget} onChange={handleEnvironmentChange}>
              <option value="">Valitse luokka tai tila</option>
              {inspectionTargetArray.map((inspectionTarget, index) => (
              <option key={index} value={inspectionTarget.id}>
                  {inspectionTarget.name}
              </option>
              ))}
          </select>
          </div>
      )

}

export default InspectionsTargetsSelectionByEnvironmentId