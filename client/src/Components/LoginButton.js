import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <>
        <LoginPrompt>Log In using Auth0</LoginPrompt>
        <Button onClick={() => loginWithRedirect()}>Sign In</Button>
      </>
    )
  );
};

const LoginPrompt = styled.div`
  margin: 30px;
  font-size: 1.5em;
`;

const Button = styled.button`
  color: white;
  height: 50px;
  width: 200px;
  font-size: 1.5em;
  border-radius: 12px;
  background-color: #7635c4;
  &:hover {
    cursor: pointer;
    border: none;
  }
`;

export default LoginButton;
