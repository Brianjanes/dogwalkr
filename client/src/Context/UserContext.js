import React, { useEffect, createContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`users/${user.email}`)
        .then((response) => response.json())
        .then((data) => {
          setLoggedInUser(data.data);
        })
        .catch((error) => console.log("User context error:", error));
    }
  }, [isAuthenticated]);
  console.log(loggedInUser);
  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};