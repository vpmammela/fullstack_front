import { useState, useEffect } from "react"
import { getEnvironment } from "../services/environment";


const EnvironmentSelection: React.FC<{ setEnvironment_id: React.Dispatch<React.SetStateAction<string>>, location_id: string }> = ({ setEnvironment_id, location_id }) => {
    const [selectedEnvironment, setSelectedEnvironment] = useState('');
    const [EnvironmentArray, setEnvironmentArray] = useState<EnvironmentData[]>([]);


    interface EnvironmentData {
        id: number;
        name: string;
      }

      useEffect(() => {
        const fetchEnvironment = async () => {
          try {
            const EnvironmentData: { environments: EnvironmentData[] } = await getEnvironment();
            const names = EnvironmentData.environments
            console.log("#### names",EnvironmentData.environments)
            setEnvironmentArray(names);
          } catch (error) {
            console.error('Error fetching locations:', error);
          }
        };
        fetchEnvironment();
    }, []);
    const handleEnvironmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setSelectedEnvironment(selectedValue);
        setEnvironment_id(selectedValue);
      };
  
      return(
          <div className="selectStyle">
              <label>Valitse Ympäristö</label>
              <select value={selectedEnvironment} onChange={handleEnvironmentChange}>
              <option value="">Valitse Ympäristö</option>
              {EnvironmentArray.map((environment, index) => (
              <option key={index} value={environment.id}>
                  {environment.name}
              </option>
              ))}
          </select>
          </div>
      )
  }
  
  export default EnvironmentSelection