import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  return (
    !isAuthenticated &&
    !user && (
      <>
        <Button onClick={() => loginWithRedirect()}>Login</Button>
      </>
    )
  );
};

const Button = styled.button`
  color: white;
  height: 30px;
  width: 125px;
  font-size: 1.1em;
  border-radius: 12px;
  background-color: #7635c4;
  &:hover {
    cursor: pointer;
    border: none;
  }
`;

export default LoginButton;
