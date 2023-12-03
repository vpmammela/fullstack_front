import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { createLocation } from "../services/locations";
import { AxiosError } from "axios";
import { useNotification } from "../NotificationContext";


const CreateLocation = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const { setNotification } = useNotification();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    function isAxiosError(error: unknown): error is AxiosError {
      return (error as AxiosError).isAxiosError !== undefined;
    }
    
    try {
      const location = await createLocation({ name, address, zipcode, city });
      setNotification(`Created Location: ${name}, ${address}, ${zipcode} ${city}`);
      navigate('/locations/') //+ location.id)
    } catch (error) {
      if (isAxiosError(error)) {
        setNotification(`Errors: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Toimipaikan nimi</label>
          <input
            id="name"
            type="text"
            value={name}
            name="name"
            onChange={({ target }) => setName(target.value)}
            placeholder="Name"
          />
        </div>

        <div>
          <label>Osoite</label>
          <input
            id="address"
            type="text"
            value={address}
            name="address"
            onChange={({ target }) => setAddress(target.value)}
            placeholder="Address"
          />
        </div>

        <div>
          <label>Postinumero</label>
          <input
            id="zipcode"
            type="text"
            value={zipcode}
            name="zipcode"
            onChange={({ target }) => setZipcode(target.value)}
            placeholder="Zipcode"
          />
        </div>

        <div>
          <label>Kaupunki</label>
          <input
            id="city"
            type="text"
            value={city}
            name="city"
            onChange={({ target }) => setCity(target.value)}
            placeholder="City"
          />
        </div>

        <div>
          <button type="submit">Tallenna</button>
        </div>
      </form>
    </div>
  );
}

export default CreateLocation;