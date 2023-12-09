import { useState, useEffect } from 'react';
import './roomSelectionStyles.css';
import QRreader from '../QRcomponent/QRreader';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getLocations } from '../../services/locations';
import LocationSelection from './LocationSelection';
import EnvironmentSelection from './EnviromentSelection';
import Header from '../header';
import InspectionsTargetsSelectionByEnvironmentId from './InspectionsTargetsSelectioByEnviromentId'
import { useReviewContext } from '../../ReviewContext';


const RoomSelectionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  overflow: hidden; /* Scrolling disabled */
`;

const GrayBackground = styled.div`
  position: fixed; /* Fixed position to keep it visible while scrolling */
  top: 66%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  background-color: lightgray;
  border-top-left-radius: 0% 50px;
  border-top-right-radius: 0% 50px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  z-index: 1; /* Ensure it's above the photo container */
`;

const FormContainer = styled.div`
  width: 80%; /* Adjust the width of the form container */
  padding-top: 85px;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RedButton = styled(Link)`
  background-color: #c9431b;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  font-size: 18px;
  border-radius: 5px;
  margin-top: 20px;
  width: 20%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;



export default function Home() {
  const [location, setLocation] = useState('');
  const [location_id, setLocation_id] = useState('')
  const [locationsArray, setLocationsArray] = useState<string[]>([]);

  const { environment_id, setEnvironment_id } = useReviewContext();
  const { inspectiontarget_id, setInspectiontarget_id } = useReviewContext();

  interface LocationData {
    name: string;
    address: string;
    zipcode: string;
    city: string;
  }

  useEffect(() => {
    const fetchLocations = async () => {
      
      try {
        const locationsData: { locations: LocationData[] } = await getLocations();
        const names = locationsData.locations.map(location => location.name);
        setLocationsArray(names);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);
  // Rooms are searched from the database
  const roomsArray = ['1A', '2A', '3A', '1B', '2B', '1C', '2C', '3C', '4C'];

  return (
    <RoomSelectionContainer>
      <Header></Header>
      <GrayBackground>
        <FormContainer>
          <FormContent>
            <h2>Valitse huone tai skannaa huoneen QR-koodi</h2>
            
            <LocationSelection setLocation_id={setLocation_id}></LocationSelection>

            {location_id && (
              <div className="selectStyle">
                <EnvironmentSelection setEnvironment_id={setEnvironment_id} location_id={location_id}></EnvironmentSelection>
                <InspectionsTargetsSelectionByEnvironmentId setInspectiontarget_id={setInspectiontarget_id} environment_id={environment_id}></InspectionsTargetsSelectionByEnvironmentId>
                <label>Valitse huone</label>
                <select>
                  {roomsArray.map((room, index) => (
                    <option key={index} value={room}>
                      {room}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <RedButton to="/reviewSelection">Tee katselmointi</RedButton>
          </FormContent>
        </FormContainer>
        <QRreader />
      </GrayBackground>
    </RoomSelectionContainer>
  );
}