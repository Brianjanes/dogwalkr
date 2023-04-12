import React, { useState, useContext } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { UserContext } from "../Context/UserContext";
import ReactMap from "../Components/ReactMap";

const NewWalk = ({ modal, setModal }) => {
  const { loggedInUser } = useContext(UserContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const [walk, setWalk] = useState(false);
  const [map, setMap] = useState(false);
  const [formInformation, setFormInformation] = useState({
    userName: loggedInUser.userName,
    image: loggedInUser.image,
    location: "",
    startTime: "",
    endTime: "",
    dateTime: new Date().toLocaleString(),
  });

  const handleClick = (e) => {
    e.preventDefault();
    setModal(!modal);
  };

  const handleMap = (e) => {
    e.preventDefault();
    setMap(!map);
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
          setWalk(!walk);
          setModal(!modal);
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
      <Button
        onClick={(e) => {
          handleMap(e);
        }}
      >
        Map
      </Button>
      {map && <ReactMap mapModal={map} setMapModal={setMap} />}

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
      <ExitDiv>
        <Button onClick={(e) => handleNewWalk(e)} disabled={!formIsValid}>
          Create Walk
        </Button>
      </ExitDiv>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 350px;
  border-radius: 20px;
  background-color: whitesmoke;
  z-index: 100;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.45);
  position: absolute;
  top: 10%;
  right: 10%;
  bottom: 10%;
  left: 20%;
`;
const Info = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin-bottom: 10px;
`;
const Button = styled.button``;
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
