import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from '../Images/logo.png';
import redSnow from '../Images/redsnow.jpg';
import { useState } from "react";
import SignedInUser from "./SignedInUser/SignedInUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import SlidingPanel from "../Instructions";
import Notification from "./Notification/Notification";


const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 25%;
  padding:5px;
  background-image: url(${redSnow});
  background-size: cover;
  background-position: center;
  overflow: hidden; /* Scrolling disabled */
  z-index: 1000;
 
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

// TODO: remove from css and add here.
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
  z-index: 2; /*render on top of everything */
`;

const UserControlButton = styled(Link)`
  position: absolute;
  top: 10px; 
  right: 10px; 
  display: flex;
  border-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-weight: bold;
  background-color: #14827d;
  color: #f9f9f9;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s; /* Add smooth transition */

  &:hover {
    color: #fdfdfd;
    background-color: #78d8d2;
}
`;

const HomeButton = styled(Link)`
  position: absolute;
  top: 10px;
  right: 180px; /* Updated to position it at the top right */
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 3px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-weight: bold;
  background-color: #14827d;
  color: #f9f9f9;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s; /* Add smooth transition */

  &:hover {
    color: #fdfdfd;
    background-color: #78d8d2;
  }
`;


export default function Header() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <HeaderContainer>
      <Notification/>
      <LogoContainer>
        <LogoImage src={logo} alt="Logo" />
      </LogoContainer>
      <LogoutButton>
        <SignedInUser />
        {/* Add the home button */}
        <HomeButton to="/">
          <FontAwesomeIcon icon={faHouse} style={{ marginRight: '5px' }} />
        </HomeButton>
        {/* Add the button to navigate to the UserControl page */}
        <UserControlButton to="/usercontrol">Hallitse käyttäjiä</UserControlButton>
      </LogoutButton>
      <SlidingPanelContainer>
        <SlidingPanel isOpen={isPanelOpen} togglePanel={togglePanel} />
      </SlidingPanelContainer>
      {isPanelOpen && (
        <OpenInsctructions>
          <FontAwesomeIcon
            icon={faCircleInfo}
            onClick={togglePanel}
            style={{
              fontSize: "2em",
              color: "#1e8278", // primary color
              backgroundColor: "#e0e9e8",
              borderRadius: 30,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ["--fa-secondary-opacity" as any]: 1, // Type cast to any
            }}
          />
        </OpenInsctructions>
      )}
    </HeaderContainer>
  );
}