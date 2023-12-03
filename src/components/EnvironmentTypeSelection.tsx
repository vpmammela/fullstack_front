import { useState, useEffect } from "react"
import { getEnvironmentType } from "../services/environment";



const EnvironmentTypeSelection: React.FC<{ setEnvironmentType_id: React.Dispatch<React.SetStateAction<string>> }> = ({ setEnvironmentType_id }) => { 
    const [envType, setEnvType] = useState('')
    const [envTypesArray, setEnvTypesArray] = useState<EnvironmentTypeData[]>([]);

    interface EnvironmentTypeData {
        id: number;
        name: string;
      }
      
    interface EnvironmentTypeResponse {
    types: EnvironmentTypeData[];
    }
    


    useEffect(() => {
        const fetchEnvironmentTypes = async () => {
          try {
            const environmentTypeData: EnvironmentTypeResponse = await getEnvironmentType();
            const etypes: EnvironmentTypeData[] = environmentTypeData.types
          
            setEnvTypesArray(etypes);
          } catch (error) {
            console.error('Error fetching environment:', error);
          }
        };
        fetchEnvironmentTypes();
    }, []);

    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value;
      setEnvType(selectedValue);
      setEnvironmentType_id(selectedValue);
    };


    return(
        <div className="selectStyle">
            <label>Valitse ympäristön tyyppi</label>
            <select value={envType} onChange={handleLocationChange}>
            <option value="">Valitse ympäristön tyyppi</option>
            {envTypesArray.map((type, index) => (
            <option key={index} value={type.id}>
                {type.name}
            </option>
            ))}
        </select>
        </div>
    )

}
export default EnvironmentTypeSelection