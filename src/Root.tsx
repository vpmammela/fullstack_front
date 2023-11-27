import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Notification from "./components/Notification/Notification";
import SignedInUser from "./components/SignedInUser/SignedInUser";
import { Outlet } from "react-router-dom";
import redSnow from './Images/redsnow.jpg';
import TestBackendConnection from "./components/TestBackendConnection/TestBackendConnection";
import Instructions from "./Instructions";
import './components/styles.css';

export default function Root() {
  // Instructions closed by default.
  const [isOpen, setIsOpen] = useState(true);
  // Open instructions panel. 
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={togglePanel} className="toggle-button">
        <FontAwesomeIcon icon={faArrowCircleLeft}/>
      </button>
      <div className="app-container">
        <Instructions isOpen={isOpen} togglePanel={togglePanel} />
        <Notification/>
        <div style={{justifyContent: "center"}}>
          <SignedInUser/>
        </div>
        <div className="content-container">
          <Outlet></Outlet>
          <TestBackendConnection />
        </div>
      </div>
      <div className="background-container">
        <img src={redSnow} alt="Background" className="background-image" /> 
      </div>
    </div>
  );
}