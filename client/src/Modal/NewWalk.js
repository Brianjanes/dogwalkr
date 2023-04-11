import React from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { useState } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";

const NewWalk = ({ modal, setModal, loggedInUser }) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [walk, setWalk] = useState(false);
  const [formInformation, setFormInformation] = useState({
    userName: loggedInUser.userName,
    image: loggedInUser.image,
    location: "",
    startTime: "",
    endTime: "",
    capacity: "",
    dateTime: new Date().toLocaleString(),
  });

  const handleClick = (e) => {
    e.preventDefault();
    setModal(false);
  };

  const handleInputChange = (e) => {
    const { name } = e.target;
    //this is for validation, ensuring that there isn't excess whitespace in our input field
    const value = e.target.value.trim();
    if (value.length > 1) {
      setFormIsValid(true);
      if (name === "location") {
        setFormInformation({
          ...formInformation,
          location: value,
        });
      } else if (name === "startTime") {
        setFormInformation({
          ...formInformation,
          startTime: value,
        });
      } else if (name === "endTime") {
        setFormInformation({
          ...formInformation,
          endTime: value,
        });
      } else if (name === "capacity") {
        setFormInformation({
          ...formInformation,
          capacity: value,
        });
      } else if (name === "userName") {
        setFormInformation({
          ...formInformation,
          userName: loggedInUser.userName,
        });
      } else if (name === "image") {
        setFormInformation({
          ...formInformation,
          image: loggedInUser.image,
        });
      }
    }
  };

  const handleNewWalk = (e) => {
    e.preventDefault();
    fetch("/walks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formInformation),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 201) {
          setWalk(true);
          setModal(false);
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <Container>
      <ExitDiv>
        <FiX onClick={(e) => handleClick(e)} />
      </ExitDiv>
      <Info>
        <InputReqs>Location: </InputReqs>
        <InputField
          type="text"
          name="location"
          placeholder="Where to start?"
          onChange={(e) => handleInputChange(e)}
        />
      </Info>
      <Info>
        <InputReqs>Start time: </InputReqs>
        <InputField
          type="text"
          name="startTime"
          placeholder="Start time"
          onChange={(e) => handleInputChange(e)}
        />
      </Info>
      <Info>
        <InputReqs>End time: </InputReqs>
        <InputField
          type="text"
          name="endTime"
          placeholder="End time"
          onChange={(e) => handleInputChange(e)}
        />
      </Info>
      <Info>
        <InputReqs>Capacity: </InputReqs>
        <InputField
          type="text"
          name="capacity"
          placeholder="How many people?"
          onChange={(e) => handleInputChange(e)}
        />
      </Info>
      <ExitDiv>
        <Button onClick={(e) => handleNewWalk(e)} disabled={!formIsValid}>
          Create Walk
        </Button>
      </ExitDiv>
    </Container>
  );
};

const LoadingDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 275px;
  border-radius: 20px;
  background-color: whitesmoke;
  z-index: 100;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.45);
  position: fixed;
  top: 200;
  right: 200;
  bottom: 200;
  left: 200;
`;
const Info = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin-bottom: 10px;
`;
const Button = styled.button`
  font-size: 1rem;
  padding: 10px 25px;
  margin: 10px;
`;
const InputReqs = styled.div`
  font-weight: bold;
`;
const InputField = styled.input`
  border-radius: 5px;
`;
const ExitDiv = styled.div`
  width: 95%;
  font-size: 1.5rem;
  display: flex;
  justify-content: flex-end;
  &:hover {
    cursor: pointer;
  }
`;

export default NewWalk;
