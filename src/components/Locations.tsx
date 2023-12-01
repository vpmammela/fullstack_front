import { Form, Link, redirect, useLoaderData } from 'react-router-dom';
import { getLocations } from '../services/locations';


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

}