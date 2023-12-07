import { useState, useEffect } from "react"
import { getLocations } from '../../services/locations';



const LocationSelection: React.FC<{ setLocation_id: React.Dispatch<React.SetStateAction<string>> }> = ({ setLocation_id }) => { 

  const [selectedLocation, setSelectedLocation] = useState('');
    const [locationsArray, setLocationsArray] = useState<LocationData[]>([]);

    interface LocationData {
        id: number;
        name: string;
        address: string;
        zipcode: string;
        city: string;
      }

      useEffect(() => {
        const fetchLocations = async () => {
          console.log("Locations Selection")
          try {
            const locationsData: { locations: LocationData[] } = await getLocations();
            const names = locationsData.locations
            setLocationsArray(names);
          } catch (error) {
            console.error('Error fetching locations:', error);
          }
        };
        fetchLocations();
    }, []);
    
    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value;
      setSelectedLocation(selectedValue);
      setLocation_id(selectedValue);
    };

    return(
        <div className="selectStyle">
            <label>Valitse toimipiste</label>
            <select value={selectedLocation} onChange={handleLocationChange}>
            <option value="">Valitse toimipiste</option>
            {locationsArray.map((location, index) => (
            <option key={index} value={location.id}>
                {location.name}
            </option>
            ))}
        </select>
        </div>
    )
}

export default LocationSelection