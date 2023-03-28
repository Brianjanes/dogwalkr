import React from "react";
import styled from "styled-components";
import { GithubLogo, LinkedinLogo } from "./CutsomIcons";

const SideBar = () => {
  return (
    <Container>
      <Bottom>
        <a
          href={"https://github.com/Brianjanes"}
          target={"_blank"}
          rel={"noopener noreferrer"}
        >
          <GithubLogo />
        </a>
        <a
          href={"https://www.linkedin.com/in/brianderrickjanes/"}
          target={"_blank"}
          rel={"noopener noreferrer"}
        >
          <LinkedinLogo />
        </a>
      </Bottom>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  height: calc(100vh - 100px);
  width: 100px;
  align-items: center;
  justify-content: flex-end;
  background-color: whitesmoke;
  position: absolute;
  z-index: 1;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  ${GithubLogo} {
    width: 30px;
    height: 30px;
    margin: 10px;
  }
  ${LinkedinLogo} {
    width: 30px;
    height: 30px;
    margin: 10px 10px 40px 10px;
  }
  a {
    cursor: pointer;
  }
`;

export default SideBar;
