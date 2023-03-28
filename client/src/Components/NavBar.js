import React from "react";
import styled from "styled-components";
import { DogLogo } from "./CutsomIcons";

const NavBar = () => {
  return (
    <>
      <Container>
        <LogoImg>
          <DogLogo />
        </LogoImg>
        <Logo>DOGWALKR</Logo>
        <RightSide>
          <HomeLink>Home</HomeLink>
          <About>About</About>
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
const HomeLink = styled.h2`
  margin: 20px;
`;
const About = styled.h2`
  margin: 20px;
`;
const Login = styled.h2`
  margin: 20px;
`;

export default NavBar;
