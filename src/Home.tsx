import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Background for form.
const GrayBackground = styled.div`
  position: absolute;
  top: 66%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
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
  color: black
  &:hover {
    color: white;
`;

const Home = () => {
 
  return (
      <GrayBackground>
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
      </GrayBackground>
  );
};

export default Home;