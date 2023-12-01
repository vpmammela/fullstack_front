import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SlidingPanel from "./Instructions";
import logo from './Images/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightgray;
  min-height: 100vh;
`;

const OpenInsctructions = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  cursor: pointer;
  z-index: 2; 
`;

const LinkButton = styled.div`
  /* Add styles*/
`;

const ReviewLink = styled(Link)`
  /* Add styles*/
`;

const LogoContainer = styled.div`
  margin-top: 10%;
`;

const LogoImage = styled.img`
  width: 300px;
  height: auto;
`;

const Home = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(true); // Instructions closed by default.

  // Open isntructions.
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <HomeContainer>
      <OpenInsctructions>
        <FontAwesomeIcon
          icon={faArrowCircleLeft}
          onClick={togglePanel}
          className="arrow-icon"
        />
      </OpenInsctructions>
      <SlidingPanel isOpen={isPanelOpen} togglePanel={togglePanel} />
      <LogoContainer>
        <LogoImage src={logo} alt="Logo" />
      </LogoContainer>
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
    </HomeContainer>
  );
};

export default Home;