import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router";
import LoadingSpinner from "../Components/LoadingSpinner";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Registration = () => {
  const [formInformation, setFormInformation] = useState({
    userName: "",
    image: "",
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    bio: "",
  });
  const [formReceived, setFormReceived] = useState(false);
  const { user } = useAuth0();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("user/addNewUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formInformation }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setFormReceived(true);
          setTimeout(() => {
            navigate("/homefeed");
          }, 3000);
        }
      });
  };

  const handleInputChange = (e) => {
    const { name } = e.target;
    if (name === "firstName") {
      setFormInformation({ ...formInformation, firstName: e.target.value });
      setFormInformation({ ...formInformation, image: user.picture });
    } else if (name === "lastName") {
      setFormInformation({ ...formInformation, lastName: e.target.value });
    } else if (name === "location") {
      setFormInformation({ ...formInformation, location: e.target.value });
    } else if (name === "bio") {
      setFormInformation({ ...formInformation, bio: e.target.value });
    } else if (name === "userName") {
      setFormInformation({ ...formInformation, userName: e.target.value });
    } else if (name === "email") {
      setFormInformation({ ...formInformation, email: e.target.value });
    }
  };

  return (
    <>
      <Wrapper>
        <Container>
          {formReceived ? (
            <>
              <Header>Your registration was successful!</Header>
              <Header>You will be redirected shortly.</Header>
              <LoadingDiv>
                <LoadingSpinner />
              </LoadingDiv>
            </>
          ) : (
            <>
              <Header>
                Hi there! We need a little more information before we proceed.
              </Header>
              <InputForm>
                <RequiredInfo>
                  <InfoRequired>First Name: </InfoRequired>
                  <InputField
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={(e) => handleInputChange(e)}
                  />
                </RequiredInfo>
                <RequiredInfo>
                  <InfoRequired>Last Name: </InfoRequired>
                  <InputField
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={(e) => handleInputChange(e)}
                  />
                </RequiredInfo>
                <RequiredInfo>
                  <InfoRequired>Username: </InfoRequired>
                  <InputField
                    type="text"
                    name="userName"
                    placeholder="Pick a username"
                    onChange={(e) => handleInputChange(e)}
                  />
                </RequiredInfo>
                <RequiredInfo>
                  <InfoRequired>Email: </InfoRequired>
                  <InputField
                    type="text"
                    name="email"
                    placeholder="Your email"
                    onChange={(e) => handleInputChange(e)}
                  />
                </RequiredInfo>
                <RequiredInfo>
                  <InfoRequired>Location: </InfoRequired>
                  <InputField
                    type="text"
                    name="location"
                    placeholder="Your city"
                    onChange={(e) => handleInputChange(e)}
                  />
                </RequiredInfo>
                <RequiredInfo>
                  <InfoRequired>Bio: </InfoRequired>
                  <Bio
                    name="bio"
                    placeholder="Tell us a little bit about yourself"
                    onChange={(e) => handleInputChange(e)}
                  ></Bio>
                </RequiredInfo>
              </InputForm>
              <Button
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Complete Registration
              </Button>
            </>
          )}
        </Container>
      </Wrapper>
    </>
  );
};

const LoadingDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputField = styled.input`
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  max-width: 100%;
  font-size: 1.25em;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100vw;
  max-height: 100vh;
  width: 100%;
  height: 100%;
`;
const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 500px;
`;
const Header = styled.h2`
  font-size: 1.25em;
  padding: 10px;
`;
const RequiredInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;
const InfoRequired = styled.div`
  display: flex;
  padding: 10px;
  font-weight: bold;
  font-size: 1.25em;
`;
const Bio = styled.textarea`
  font-size: 1.25em;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
  min-width: 300px;
  min-height: 100px;
  font-family: "Roboto", sans-serif;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  height: 80%;
  width: 45%;
  border-radius: 20px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.45);
  padding: 150px;
`;
const Button = styled.button`
  font-size: 1.25em;
  padding: 15px 30px;
`;

export default Registration;
