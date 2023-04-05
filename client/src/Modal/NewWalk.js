import React from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { useState } from "react";

const NewWalk = ({ modal, setModal }) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [formInformation, setFormInformation] = useState({
    location: "",
    startTime: "",
    endTime: "",
    capacity: "",
  });
  const [walk, setWalk] = useState(false);

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
    }

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
    }

    // if (
    //   formInformation.location.length > 1 &&
    //   formInformation.startTime.length > 1 &&
    //   formInformation.endTime.length > 1 &&
    //   formInformation.capacity.length > 0
    // ) {
    //   setFormIsValid(true);
    // }
    // setFormIsValid(
    //   formInformation.location.length > 1 &&
    //     formInformation.startTime.length > 1 &&
    //     formInformation.endTime.length > 1 &&
    //     formInformation.capacity.length > 0
    // );
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
        console.log("New Walk Created", data);
        setWalk(true);
        setModal(false);
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
      <Button onClick={(e) => handleNewWalk(e)} disabled={!formIsValid}>
        Create Walk
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 350px;
  border-radius: 20px;
  background-color: whitesmoke;
  z-index: 1;
`;
const Info = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;
const Button = styled.button`
  font-size: 1em;
  padding: 7px 15px;
  border: none;
  border-radius: 5px;
  background-color: #7635c4;
  color: white;
  margin: 10px;
  cursor: pointer;
`;
const InputReqs = styled.div`
  font-weight: bold;
`;
const InputField = styled.input`
  border-radius: 5px;
  font-family: "Courier New", Courier, monospace;
`;
const ExitDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  &:hover {
    cursor: pointer;
  }
`;

export default NewWalk;
