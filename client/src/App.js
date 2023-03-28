import NavBar from "../src/Components/NavBar";
import SideBar from "../src/Components/SideBar";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import Home from "./Components/Home";

const App = () => {
  return (
    <>
      <NavBar />
      <Wrapper>
        <GlobalStyles />

        <SideBar />
        {/* routes will go here later, king */}
        <Container>
          <Home />
        </Container>
      </Wrapper>
    </>
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
