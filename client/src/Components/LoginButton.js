import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import React from "react";

//login button for auth0.

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

const Button = styled.button``;

export default LoginButton;
