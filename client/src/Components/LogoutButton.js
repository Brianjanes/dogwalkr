import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

import React from "react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  return isAuthenticated && <Button onClick={() => logout()}>Logout</Button>;
};

const Button = styled.button`
  color: white;
  height: 40px;
  width: 125px;
  font-size: 1.1em;
  border-radius: 12px;
  background-color: #7635c4;
  &:hover {
    cursor: pointer;
    border: none;
  }
`;

export default LogoutButton;
