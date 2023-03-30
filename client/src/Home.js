import styled from "styled-components";
import backgroundImg from "./Images/background.PNG";
import LoginButton from "./Components/LoginButton";
import LogoutButton from "./Components/LogoutButton";
import Profile from "./Components/Profile";
import LoadingSpinner from "./Components/LoadingSpinner";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  return (
    <>
      <Container>
        <FormContainer>
          {isAuthenticated && (
            <LoginForm>
              {error && <h2>Authentication Error</h2>}
              {!error && isLoading && (
                <LoadingDiv>
                  <LoadingSpinner />
                </LoadingDiv>
              )}
              {!error && !isLoading && (
                <>
                  <Profile />
                  <LoginButton />
                  <LogoutButton />
                </>
              )}
            </LoginForm>
          )}
        </FormContainer>
        <BackgroundImage></BackgroundImage>
      </Container>
    </>
  );
};

const LoadingDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
