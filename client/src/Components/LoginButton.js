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
  height: 30px;
  width: 125px;
  font-size: 1.1em;
`;

export default LoginButton;
