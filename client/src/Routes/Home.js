import styled from "styled-components";
import LoginButton from "../Components/LoginButton";
import LogoutButton from "../Components/LogoutButton";
import LoadingSpinner from "../Components/LoadingSpinner";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Home = () => {
  const { isAuthenticated, isLoading, error, user } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async (user) => {
      try {
        if (isAuthenticated) {
          const response = await fetch(`/user/check?email=${user.email}`, {
            method: "GET",
          });
          const data = await response.json();
          if (data.inDB === true) {
            setLoading(false);
            navigate("/homefeed");
          } else {
            navigate("/register");
          }
        }
      } catch (error) {
        console.error("Error adding user:", error);
      }
    };
    checkUser(user);
    setCurrentUser(user);
  }, [isAuthenticated]);

  return (
    <>
      <Container>
        <FormContainer>
          <LoginForm>
            {error && <h2>Authentication Error</h2>}
            {!error && loading && user && (
              <LoadingDiv>
                <LoadingSpinner />
              </LoadingDiv>
            )}
            {!error && !loading && isAuthenticated && (
              <>
                <LogoutButton />
              </>
            )}
            {!error && loading && !isAuthenticated && !isLoading && (
              <>
                <Header>Hi there! welcome to DOGWALKR!</Header>
                <Header>Please login to continue.</Header>
                <LoginButton />
              </>
            )}
          </LoginForm>
        </FormContainer>
      </Container>
    </>
  );
};

const Header = styled.h2`
  font-size: 1.5em;
  padding: 0.5em;
`;

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
  margin-bottom: 50px;
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