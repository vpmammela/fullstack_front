import { Form, Link, redirect, useLoaderData } from 'react-router-dom';
import { getLocations } from '../services/locations';
import { useEffect, useState } from 'react';
import CreateEnvironmentType from './CreateEnvironmentType';
import CreateEnvironment from './CreateEnvironment';
import EnvironmentTypeSelection from './EnvironmentTypeSelection';
import styled from 'styled-components';

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-self: stretch; /* Täyttää koko leveyden */
  background-color: lightgray;
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

  return (
    
    <LocationContainer>
      <h2>Toimipaikkojen ja ympäristöjen hallinta</h2>
      <Container1>
        <CreateEnvironment></CreateEnvironment>
      </Container1> 
      <Container1>
        <CreateEnvironmentType></CreateEnvironmentType>
      </Container1>
    
      {locations.length > 0 ? (
        locations.map((location) => (
          <p key={location.id}>id: {location.id}<br></br> name: {location.name}</p>
        ))
      ) : (
        <p>Toimipaikkoja ei saatavilla</p>
      )}
      <Link className="button" to="/locations/create">
        New location
      </Link>
    </LocationContainer>
  );
}