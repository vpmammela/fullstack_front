import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from '../Images/logo.png';
import redSnow from '../Images/redsnow.jpg';
import { useState } from "react";
import SignedInUser from "./SignedInUser/SignedInUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import SlidingPanel from "../Instructions";

const HeaderContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20%;
  width: 100%;
  right: 0;
  top:0;
  padding:5px;
  background-image: url(${redSnow});
  background-size: cover;
  background-position: center;
  overflow: hidden; /* Scrolling disabled */
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  top: 15%;
 
  z-index: 2; /* Logo is on top of everything */
`;

const LogoImage = styled.img`
  width: 80%;
  height: auto;
  margin-top: 2px;
`;
const LogoutButton = styled.div`
    display: flex;
`
const OpenInsctructions = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
 
  cursor: pointer;
  z-index: 1000; /* Should render above everyhting everywhere?
  TODO: Make sure it does ^ */
`;

const SlidingPanelContainer = styled.div`
  position: absolute;
  z-index: 2; /* Suurempi kuin muiden komponenttien z-index */
  /* Muut tyylit */
`;

export default function Header() {
    const [isPanelOpen, setIsPanelOpen] = useState(true); // Instructions closed by default.

    // Open isntructions.
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoImage src={logo} alt="Logo" />
      </LogoContainer>
      <LogoutButton>
        <SignedInUser/>
      </LogoutButton>
      <SlidingPanelContainer>
        <SlidingPanel isOpen={isPanelOpen} togglePanel={togglePanel} />
      </SlidingPanelContainer>
      
      {isPanelOpen && (<OpenInsctructions>
          {/* <FontAwesomeIcon
            icon={faArrowCircleLeft}
            onClick={togglePanel}
            className="arrow-icon"
          /> */}
          <FontAwesomeIcon 
            icon={faCircleInfo}  
            onClick={togglePanel}
            style={{
                fontSize:"2em",
                color: "#1e8278", // primary color
                backgroundColor: "#e0e9e8",
                borderRadius:30,
                "--fa-secondary-opacity": 1, // secondary opacity (if applicable)
            }as React.CSSProperties}/>
        </OpenInsctructions>
        )}
    </HeaderContainer>
  );
}