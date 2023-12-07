import { useState, useEffect } from "react"
import {getInspectionTargetsByEnviromentsId} from'../../services/inspectiontarget'


const InspectionsTargetsSelectionByEnvironmentId: React.FC<{ setInspectiontarget_id: React.Dispatch<React.SetStateAction<string>>, environment_id: string }> = ({ setInspectiontarget_id, environment_id}) => {
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
            const InspectionTargetData: { inspectionTarget: InspectionTargetData[] } = await getInspectionTargetsByEnviromentsId(environment_id);
            const names = InspectionTargetData.inspectionTarget
            console.log("#### names",InspectionTargetData.inspectionTarget)
            setInspectionTargetArray(names);
          } catch (error) {
            console.error('Error fetching locations:', error);
          }
        };
        fetchEnvironment();
    }, [environment_id]);
    const handleEnvironmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setSelectedInspectionTarget(selectedValue);
        setInspectiontarget_id(selectedValue);
      };
  
      return(
          <div className="selectStyle">
              <label>Valitse luokka tai tila</label>
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