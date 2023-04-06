import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

import React from "react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  return isAuthenticated && <Button onClick={() => logout()}>Logout</Button>;
};

const Button = styled.button`
  height: 40px;
  width: 125px;
  font-size: 1.1em;
`;

export default LogoutButton;
