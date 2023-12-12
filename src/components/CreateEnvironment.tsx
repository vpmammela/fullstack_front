import { useState, useEffect } from "react"
import { useNotification } from "../NotificationContext";
import { AxiosError } from "axios";
import { createEnvironment } from "../services/environment";
import { getLocations } from '../services/locations';
import LocationSelection from "./RoomSelection/LocationSelection";
import EnvironmentTypeSelection from "./EnvironmentTypeSelection";
import styled from 'styled-components';

const Container = styled.div`
  margin:10px;
`
const Inputstyle = styled.input`
margin: 10px;
border-radius: 4px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
border: 0;
padding: 10px; 

`

const StyledButton = styled.button`
width: 80%;
padding: 12px;
box-sizing: border-box;
border: none;
border-radius: 8px;
background-color: #C9431B;
color: white;
cursor: pointer;
font-weight: bold;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
margin-top: 10px;
`;

export default function CreateEnvironment() {
    const [name, setName] =useState('')
    const [description, setDescription]= useState('')
    const [location_id, setLocation_id] = useState<number>(0)
    const [environmenttype_id, setEnvironmentType_id] =useState<number>(0)
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
                <Container>
                <label>Ympäristön nimi</label>
                <Inputstyle
                    id="name"
                    type="text"
                    value={name}
                    name="name"
                    onChange={({ target }) => setName(target.value)}
                    placeholder="Ympäristön nimi"
                />
                </Container>
                <Container>
                <label>Ympäristön kuvaus</label>
                <Inputstyle
                    id="description"
                    type="text"
                    value={description}
                    name="description"
                    onChange={({ target }) => setDescription(target.value)}
                    placeholder="Kuvaus ympäristöstä"
                />
                </Container>
                <LocationSelection setLocation_id={setLocation_id}></LocationSelection>
                <EnvironmentTypeSelection setEnvironmentType_id={setEnvironmentType_id}></EnvironmentTypeSelection>
                <div>
                  <StyledButton type="submit">Tallenna</StyledButton>
                </div>
        </form>
        </div>
    )
}