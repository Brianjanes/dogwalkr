import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import React from "react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  return isAuthenticated && <Button onClick={() => logout()}>Logout</Button>;
};

const Button = styled.button``;

export default LogoutButton;
