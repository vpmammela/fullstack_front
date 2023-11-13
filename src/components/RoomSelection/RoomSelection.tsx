import { useState } from 'react';
import './roomSelectionStyles.css'
import QRreader from "../QRcomponent/QRreader";
import { Link } from 'react-router-dom';


export default function Home() {
    const [location, setLocation]=useState('')
    //const [room, setroom]=useState('')

    //Locations are searched from the database
  const locationsArray=["Rovaniemi", "Kemi", "Tornio"]
  // Rooms are searched from the database
  const roomsArray =["1A","2A", "3A", "1B","2B","1C","2C", "3C", "4C"]

  return(
    <div>
      <h2>Valitse huone tai skannaan huoneen QR-koodi</h2>
        <div className='selectStyle'>
          <label>Valitse toimipiste</label>
          <select value={location}
              onChange={(e) => setLocation(e.target.value)}>
              <option value="" >Select Location</option>
              {locationsArray.map((location, index) => (
              <option key={index} value={location}>{location}</option>
              ))}
          </select>
        </div>
          
        {location && (
          <div className='selectStyle'>
          <label>Valitse huone</label>
            <select>
            {roomsArray.map((room, index)=> (
            <option key={index} value={room}>{room}</option>
            ))}
            </select>
            </div>
        )}
        <div className="linkbutton">
          <Link className="review-link" to="/reviewSelection">Tee katselmointi</Link>
        </div>
        <QRreader/>
    </div>
  )
}

