import React from "react";
import styled from "styled-components";
import { DogLogo } from "./CutsomIcons";

const NavBar = () => {
  return (
    <>
      <Container>
        <a href={"http://localhost:3000"} rel={"noopener noreferrer"}>
          <LogoImg>
            <DogLogo />
          </LogoImg>
        </a>

        <Logo>DOGWALKR</Logo>
        <RightSide>
          <HomeLink href={"http://localhost:3000"} rel={"noopener noreferrer"}>
            <HomeText>Home</HomeText>
          </HomeLink>

          <AboutLink
            href={"http://localhost:3000/about"}
            rel={"noopener noreferrer"}
          >
            <About>About</About>
          </AboutLink>
          <Login>Login</Login>
        </RightSide>
      </Container>
    </>
  );
};

const LogoImg = styled.div`
  margin: 10px;
`;
const Container = styled.div`
  width: auto;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f3f3f3;
`;
const RightSide = styled.div`
  display: flex;
  margin-right: 200px;
`;
const Logo = styled.h1`
  font-size: 1.75em;
  margin-left: 300px;
`;
const HomeLink = styled.a`
  text-decoration: none;
`;
const HomeText = styled.h2`
  margin: 20px;
`;
const AboutLink = styled.a`
  text-decoration: none;
`;
const About = styled.h2`
  margin: 20px;
`;
const Login = styled.h2`
  margin: 20px;
`;

export default NavBar;
