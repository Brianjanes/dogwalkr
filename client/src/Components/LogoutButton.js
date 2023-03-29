import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

import React from "react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  return isAuthenticated && <Button onClick={() => logout()}>Sign Out</Button>;
};

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

export default LogoutButton;
