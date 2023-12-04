import { useState } from "react";
import Notification from "./components/Notification/Notification";
import SignedInUser from "./components/SignedInUser/SignedInUser";
import { Outlet } from "react-router-dom";
import redSnow from './Images/redsnow.jpg';
import TestBackendConnection from "./components/TestBackendConnection/TestBackendConnection";
import './components/styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Header from "./components/header";

const OpenInsctructions = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  cursor: pointer;
  z-index: 1000; /* Should render above everyhting everywhere?
  TODO: Make sure it does ^ */
`;

export default function Root() {


  return (
    <>
    <Header></Header>
      <div className="app-container">
        <Notification />
        <div className="content-container">
          <Outlet></Outlet>
          <TestBackendConnection />
        </div>
      </div>
      
    </>
  );
}