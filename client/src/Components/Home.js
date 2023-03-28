import styled from "styled-components";
import backgroundImg from "../Images/background.PNG";

const Home = () => {
  return (
    <>
      <Container>
        <FormContainer>
          <LoginForm></LoginForm>
        </FormContainer>
        <BackgroundImage></BackgroundImage>
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  width: 100%;
  height: 100%;
`;

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

const LoginForm = styled.div`
  background-color: whitesmoke;
  height: 70%;
  width: 50%;
  border-radius: 20px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.45);
  z-index: 1;
  margin-bottom: 50px; ;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export default Home;
