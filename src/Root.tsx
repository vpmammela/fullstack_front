import { useState } from "react";
import Notification from "./components/Notification/Notification";
import SignedInUser from "./components/SignedInUser/SignedInUser";
import { Outlet } from "react-router-dom";
import redSnow from './Images/redsnow.jpg';
import TestBackendConnection from "./components/TestBackendConnection/TestBackendConnection";
import Instructions from "./Instructions";
import './components/styles.css'


export default function Root() {
  const [notification, setNotification] = useState("default notification");
  
  // Instructions closed by default.
  const [isOpen, setIsOpen] = useState(true);
  // Open instructions panel. 
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app-container">
      <button onClick={togglePanel} className="toggle-button">
        Open instructions
      </button>
      <Instructions isOpen={isOpen} togglePanel={togglePanel} />
      <Notification notification={notification} />
      <div className="content-container">
        <SignedInUser setNotification={setNotification} />
        <Outlet></Outlet>
        <TestBackendConnection />
      </div>
      <img src={redSnow} alt="Background" className="background-image" /> 
    </div>
  );
}