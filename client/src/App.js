import NavBar from "../src/Components/NavBar";
import SideBar from "../src/Components/SideBar";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import Home from "./Routes/Home";
import About from "./Routes/About";
import Registration from "./Routes/Registration";
import Feed from "./Routes/Feed";
import backgroundImg from "./Images/background.PNG";
import Profile from "./Routes/Profile";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const { user, isAuthenticated } = useAuth0();
  const [currentUser, setCurrentUser] = useState(user);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchUser = async (user) => {
      try {
        if (isAuthenticated) {
          const response = await fetch(`/users/${user.email}`, {
            method: "GET",
          });
          const data = await response.json();
          setLoggedInUser(data.data);
          setCurrentUser(user);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchUser(user);
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <NavBar />
      <Wrapper>
        <GlobalStyles />
        <SideBar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Registration />} />
            <Route
              path="/homefeed"
              element={<Feed loggedInUser={loggedInUser} />}
            />
            <Route
              path="/:userName"
              element={
                <Profile
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />
          </Routes>
        </Container>
        <BackgroundImage></BackgroundImage>
      </Wrapper>
    </BrowserRouter>
  );
};

const BackgroundImage = styled.div`
  max-height: 100vw;
  height: 100%;
  max-width: 100vw;
  width: 100%;
  z-index: -1;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(2px);
`;

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;
const Wrapper = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  min-height: calc(100vh - 100px);
  min-width: 100vw;
  overflow: hidden;
  position: absolute;
`;

export default App;
