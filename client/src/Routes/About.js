import React from "react";
import styled from "styled-components";

//about page route.

const About = () => {
  return (
    <Wrapper>
      <Container>
        <InfoContainer>
          <Info>
            <AboutInfo>
              Hi there! Welcome to DOGWALKR, my final project for Concordia's
              Coding Bootcamp.
            </AboutInfo>
            <AboutInfo>
              DOGWALKR is a way to link up with your friends to go for a walk
              with your dogs. You can make a public post to go for a walk, and
              you can see if your friends are looking to go for a walk, or if
              they've already gone for a walk.
            </AboutInfo>
          </Info>
        </InfoContainer>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  width: 100%;
  height: 100%;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  height: 70%;
  width: 50%;
  border-radius: 20px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.45);
  z-index: 1;
  margin-bottom: 50px;
`;

const AboutInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px;
  width: 80%;
  font-size: 1.5em;
`;

export default About;
