import { useState } from "react"
import { createEnvironmentType } from "../services/environment";
import { useNotification } from "../NotificationContext";
import { AxiosError } from "axios";
import styled from 'styled-components';

const Inputstyle = styled.input`
margin: 10px;
border-radius: 4px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
border: 0;
padding: 10px; 

`;
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


export default function CreateEnvironmentType() {
    const [name, setName] =useState('')
    const { setNotification } = useNotification();

    const handleSubmit = async (event: { preventDefault: () => void }) => {
      event.preventDefault();

      function isAxiosError(error: unknown): error is AxiosError {
        return (error as AxiosError).isAxiosError !== undefined;
      }


      try {
        const environmentType = await createEnvironmentType({name});
        setNotification(`Created EnvironmentType: ${name}`);
        
        
      } catch (error) {
        if (isAxiosError(error)) {
          setNotification(`Errors: ${error.message}`);
        }
      }


    }


    return(
        <div>
          <h2>Lisää Ympäristön tyyppi</h2>
            <form onSubmit={handleSubmit}>
        <div>
          <label>Ympäristön tyyppi </label>
          <Inputstyle
            id="name"
            type="text"
            value={name}
            name="name"
            onChange={({ target }) => setName(target.value)}
            placeholder="Ympäristön tyyppi"
          />
        </div>
        <div>
          <StyledButton type="submit">Tallenna</StyledButton>
        </div>
        </form>
        </div>
    )
}