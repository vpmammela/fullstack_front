import { useState } from "react";
import Notification from "./components/Notification/Notification";
import SignedInUser from "./components/SignedInUser/SignedInUser";
import { Outlet } from "react-router-dom";
import redSnow from './Images/redsnow.jpg';
import TestBackendConnection from "./components/TestBackendConnection/TestBackendConnection";
import './components/styles.css';

export default function Root() {

  return (  
      <><div className="app-container">
      <Notification />
      <div style={{ justifyContent: "center" }}>
        <SignedInUser />
      </div>
      <div className="content-container">
        <Outlet></Outlet>
        <TestBackendConnection />
      </div>
    </div><div className="background-container">
        <img src={redSnow} alt="Background" className="background-image" />
      </div></>
  );
}