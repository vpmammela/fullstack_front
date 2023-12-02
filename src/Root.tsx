import { useState } from "react";
import Notification from "./components/Notification/Notification";
import SignedInUser from "./components/SignedInUser/SignedInUser";
import { Outlet } from "react-router-dom";
import redSnow from './Images/redsnow.jpg';
import TestBackendConnection from "./components/TestBackendConnection/TestBackendConnection";
import './components/styles.css';
import SlidingPanel from "./Instructions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const OpenInsctructions = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  cursor: pointer;
  z-index: 1000; /* Should render above everyhting everywhere?
  TODO: Make sure it does ^ */
`;

export default function Root() {
  const [isPanelOpen, setIsPanelOpen] = useState(true); // Instructions closed by default.

  // Open isntructions.
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <>
      <div className="app-container">
        <SlidingPanel isOpen={isPanelOpen} togglePanel={togglePanel} />
        <OpenInsctructions>
          <FontAwesomeIcon
            icon={faArrowCircleLeft}
            onClick={togglePanel}
            className="arrow-icon"
          />
        </OpenInsctructions>
        <Notification />
        <div style={{ justifyContent: "center" }}>
          <SignedInUser />
        </div>
        <div className="content-container">
          <Outlet></Outlet>
          <TestBackendConnection />
        </div>
      </div>
      <div className="background-container">
        <img src={redSnow} alt="Background" className="background-image" />
      </div>
    </>
  );
}