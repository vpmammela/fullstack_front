import { Form, Link, redirect, useLoaderData } from 'react-router-dom';
import { getLocations } from '../services/locations';
import { useEffect, useState } from 'react';
import CreateEnvironmentType from './CreateEnvironmentType';
import CreateEnvironment from './CreateEnvironment';
import EnvironmentTypeSelection from './EnvironmentTypeSelection';



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
  //const { locations } = useLoaderData() as LocationsData;

  /*
  const { locations } = useLoaderData() as LocationsData || { locations: [] } as LocationsData;

  if(locations.length === 0) {
    return <p>Server not rendering data!!!</p>
  }

  const locationElements = locations.map((location: Location) => {
    return <p key={location.id}>{location.name}</p>
  })

  return <>
    {locationElements}
    <Link className="button" to={"/locations/create"}>New location</Link>
  </>
  */

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
    
    <div>
      <h2>YMPÄRISTÖN TYYPIN JA UUDEN YMPÄRISTÖN VOI TEHDÄ VAIN ADMIN</h2>
      <h2>NÄMÄ EIVÄT OLE OIKEASSA PAIKASSA</h2>
      <CreateEnvironmentType></CreateEnvironmentType>
      <CreateEnvironment></CreateEnvironment>
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
    </div>
  );
}