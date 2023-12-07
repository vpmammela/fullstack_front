import { useState, useEffect } from "react"
import { useNotification } from "../NotificationContext";
import { AxiosError } from "axios";
import { createEnvironment } from "../services/environment";
import { getLocations } from '../services/locations';
import LocationSelection from "./RoomSelection/LocationSelection";
import EnvironmentTypeSelection from "./EnvironmentTypeSelection";

export default function CreateEnvironment() {
    const [name, setName] =useState('')
    const [description, setDescription]= useState('')
    const [location_id, setLocation_id] = useState('')
    const [environmenttype_id, setEnvironmentType_id] =useState('')
    const { setNotification } = useNotification();


    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
  
        function isAxiosError(error: unknown): error is AxiosError {
          return (error as AxiosError).isAxiosError !== undefined;
        }
  
  
        try {
          const environment = await createEnvironment({name,description, location_id, environmenttype_id});
          setNotification(`Created EnvironmentType: ${name}, ${description}`);
          
          
        } catch (error) {
          if (isAxiosError(error)) {
            setNotification(`Errors: ${error.message}`);
          }
        }
  
      }
     
    return(
        <div>
          <h2>Lisää uusi ympäristö</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Ympäristön nimi</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    name="name"
                    onChange={({ target }) => setName(target.value)}
                    placeholder="Ympäristön nimi"
                />
                </div>
                <div>
                <label>Ympäristön kuvaus</label>
                <input
                    id="description"
                    type="text"
                    value={description}
                    name="description"
                    onChange={({ target }) => setDescription(target.value)}
                    placeholder="Kuvaus ympäristöstä"
                />
                </div>
                <LocationSelection setLocation_id={setLocation_id}></LocationSelection>
                <EnvironmentTypeSelection setEnvironmentType_id={setEnvironmentType_id}></EnvironmentTypeSelection>
                <div>
                  <button type="submit">Tallenna</button>
                </div>
        </form>
        </div>
    )
}