import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SlidingPanel from "./Instructions";
import logo from './Images/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import redSnow from './Images/redsnow.jpg';

const HomeContainer = styled.div`
position: relative;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
background-image: url(${redSnow});
background-size: cover;
background-position: center;
overflow: hidden; /* Scrolling disabled */
`;

// Background for form.
const GrayBackground = styled.div`
  position: absolute;
  top: 66%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 70vh;
  background-color: lightgray;
  border-top-left-radius: 0% 50px;
  border-top-right-radius: 0% 50px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const LinkButton = styled.div`
  padding-top: 20px;
  margin-top: 2%;
`;

const ReviewLink = styled(Link)`
  /* Add styles*/
`;

// AMK logo.
const LogoContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%); 
  z-index: 2; /* Logo is on top of everything */
`;

const LogoImage = styled.img`
  width: 300px;
  height: auto;
`;

const Home = () => {
  
  return (
    <HomeContainer>
      <LogoContainer>
        <LogoImage src={logo} alt="Logo" />
      </LogoContainer>
      <GrayBackground>
      <LinkButton>
        <ReviewLink to="/roomselection" className="review-link">
          Tee katselmointi
        </ReviewLink>
      </LinkButton>
      <LinkButton>
        <ReviewLink to="/roomselection" className="review-link">
          Huoneen ohjeet
        </ReviewLink>
      </LinkButton>
      <LinkButton>
        <ReviewLink to="/roomselection" className="review-link">
          Raportit
        </ReviewLink>
      </LinkButton>
      </GrayBackground>
    </HomeContainer>
  );
};

export default Home;