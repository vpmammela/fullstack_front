import { Form, Link, redirect, useLoaderData } from 'react-router-dom';
import { getLocations } from '../services/locations';
import { useEffect, useState } from 'react';
import CreateEnvironmentType from './CreateEnvironmentType';
import CreateEnvironment from './CreateEnvironment';
import EnvironmentTypeSelection from './EnvironmentTypeSelection';
import styled from 'styled-components';

const LocationContainer = styled.div`
  position: absolute;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-self: center; /* Täyttää koko leveyden */
  background-color: lightgray;
  margin-top: 180px;
`;
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

interface Location {
  id: number;
  name: string;
  address: string;
  zip_code: string;
  city: string;
}

interface LocationsData {
  locations: Location[]; 
}

export async function loader(): Promise<LocationsData> {
  const data = await getLocations();
  return { locations: data.locations }
}

export default function Locations() {


  const [locations, setLocations] = useState<Location[]>([]);
  const [showLocation, setShowLocation]=useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLocations();
        setLocations(data.locations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } 
    };

    fetchData();
  }, []);

  const showLocations= ()=>{
    setShowLocation(true)
  }

  return (
    
    <LocationContainer>
      <h2>Toimipaikkojen ja ympäristöjen hallinta</h2>
      <Container1>
        <CreateEnvironment></CreateEnvironment>
      </Container1> 
      <Container1>
        <CreateEnvironmentType></CreateEnvironmentType>
      </Container1>
      <Container1>
        <h2>Lisää uusi toimipaikka</h2>
      <Link className="button" to="/locations/create">
        Lisää uusi toimipaikka
      </Link>
      <button className="button" onClick={showLocations}>Näytä tämän hetkiset toimipaikat</button>
      </Container1>
      {showLocation && (
      <Container1>
        <h3>Toimipaikat</h3>
      {locations.length > 0 ? (
        locations.map((location) => (
          <p key={location.id}>{location.name}</p>
        ))
      ) : (
        <p>Toimipaikkoja ei saatavilla</p>
      )}
      </Container1>)}
    </LocationContainer>
  );
}