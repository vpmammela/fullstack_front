import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Background for form.
const GrayBackground = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  background-color: lightgray;
  border-top-left-radius: 0% 50px;
  border-top-right-radius: 0% 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center vertically */
  box-sizing: border-box;
`;

const LinkContainer = styled.div`
  text-align: center;
  margin-top: 5%;
`;

const LinkButton = styled.div`
  padding-top: 50px;
  margin-top: 2%;
`;

const ReviewLink = styled(Link)`
  color: black;
  text-decoration: none; /* Remove default underline */
  font-weight: bold;
  font-size: 20px;
  &:hover {
    color: white;
  }
`;

const Home = () => {
  useEffect(() => {
    // Disable scrolling when the component mounts.
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when the component unmounts.
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <GrayBackground>
      <LinkContainer>
        <LinkButton>
          <ReviewLink to="/locations" className="review-link">
            Hallinnoi toimipisteitä ja ympäristöjä
          </ReviewLink>
        </LinkButton>
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
          <ReviewLink to="/raports" className="review-link">
            Raportit
          </ReviewLink>
        </LinkButton>
      </LinkContainer>
    </GrayBackground>
  );
};

export default Home