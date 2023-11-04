import React, { useState } from "react";
import Notification from "./components/Notification/Notification";
import SignedInUser from "./components/SignedInUser/SignedInUser";
import { Outlet } from "react-router-dom";
import redSnow from './Images/redsnow.jpg';
import TestBackendConnection from "./components/TestBackendConnection/TestBackendConnection";
import Home from "./Home";
import Instructions from "./Instructions";

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
      <img src={redSnow} alt="Background" className="background-image" />
      <Notification notification={notification} />
      <SignedInUser setNotification={setNotification} />
      <Home></Home>
      <Outlet></Outlet>
      <TestBackendConnection />
    </div>
  );
}