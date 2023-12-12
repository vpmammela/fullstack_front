import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { createLocation } from "../services/locations";
import { AxiosError } from "axios";
import { useNotification } from "../NotificationContext";
import styled from "styled-components";

const GrayBackground = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Väli input-kenttien välillä */
`;

const Inputstyle = styled.input`
margin: 10px;
border-radius: 4px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
border: 0;
padding: 10px; 

`
const Container1 = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  margin: 20px;
  width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    width: 90%;
    box-shadow: none; /* Voit muuttaa varjoa tarpeidesi mukaan tai jättää sen pois kokonaan */
  }
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
      <GrayBackground>
        <Container1>
        <FormContainer>
          <h2>Lisää toimipaikka</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Toimipaikan nimi</label>
              <Inputstyle
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
              <Inputstyle
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
              <Inputstyle
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
              <Inputstyle
                id="city"
                type="text"
                value={city}
                name="city"
                onChange={({ target }) => setCity(target.value)}
                placeholder="City"
              />
            </div>

            <div>
              <StyledButton type="submit">Tallenna</StyledButton>
            </div>
          </form>
        </FormContainer>
        </Container1>
      </GrayBackground>
    </div>
  );
}

export default CreateLocation;