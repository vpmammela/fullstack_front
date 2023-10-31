import { useState } from "react";
import Notification from "./components/Notification/Notification";
import SignedInUser from "./components/SignedInUser/SignedInUser";
import { Outlet } from "react-router-dom";
import redSnow from './Images/redsnow.jpg';
import TestBackendConnection from "./components/TestBackendConnection/TestBackendConnection";
import Home from "./Home";

export default function Root(){
  const [notification, setNotification] = useState<string>("default notification");

  return (
    <div className="app-container">
      <img src={redSnow} alt="Background" className="background-image" />
      <Notification notification={notification}/>
      <SignedInUser setNotification={setNotification} />
      <Home></Home> 
      <Outlet></Outlet>
      <TestBackendConnection/>
    </div>
  )

}