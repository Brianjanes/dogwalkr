import NavBar from "../src/Components/NavBar";
import SideBar from "../src/Components/SideBar";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import Home from "./Home";
import About from "./About";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
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
          </Routes>
        </Container>
      </Wrapper>
    </BrowserRouter>
  );
};

const Container = styled.div`
  position: absolute;
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
