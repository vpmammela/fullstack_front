import { useState } from "react"
import { createEnvironmentType } from "../services/environment";
import { useNotification } from "../NotificationContext";
import { AxiosError } from "axios";


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
          <input
            id="name"
            type="text"
            value={name}
            name="name"
            onChange={({ target }) => setName(target.value)}
            placeholder="Ympäristön tyyppi"
          />
        </div>
        <div>
          <button type="submit">Tallenna</button>
        </div>
        </form>
        </div>
    )
}