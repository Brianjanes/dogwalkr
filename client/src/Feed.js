import React from "react";
import { useState } from "react";
import styled from "styled-components";
import NewWalk from "./Modal/NewWalk";
import { useEffect } from "react";

const Feed = () => {
  const [modal, setModal] = useState(false);
  const [walks, setWalks] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    setModal(true);
  };

  useEffect(() => {
    fetch("/walks")
      .then((response) => response.json())
      .then((data) => {
        setWalks(data.data);
      });
  }, []);

  return (
    <Wrapper>
      {modal && <NewWalk modal={modal} setModal={setModal} />}
      <ButtonDiv>
        <NewWalkButton onClick={(e) => handleClick(e)}>
          Create New Walk
        </NewWalkButton>
      </ButtonDiv>
      <Container>
        {walks.map((walk) => {
          return (
            <WalkDiv key={walk.id}>
              <WalkLocation>{walk.location}</WalkLocation>
              <WalkDuration>{walk.duration}</WalkDuration>
              <WalkStartTime>{walk.startTime}</WalkStartTime>
              <WalkCapacity>{walk.capacity}</WalkCapacity>
              <JoinWalkButton>Join Walk</JoinWalkButton>
            </WalkDiv>
          );
        })}
      </Container>
    </Wrapper>
  );
};

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const NewWalkButton = styled.button`
  font-size: 1.25em;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  background-color: #7635c4;
  color: white;
  margin: 10px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
  height: 100%;
  border-radius: 20px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.45);
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 80%;
`;
const JoinWalkButton = styled.button`
  font-size: 1em;
  padding: 7px 15px;
  border: none;
  border-radius: 5px;
  background-color: #7635c4;
  color: white;
  margin: 10px;
  cursor: pointer;
`;
const WalkDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 8px;
  width: 80%;
  margin: 10px;
  padding: 10px;
`;
const WalkLocation = styled.p`
  font-weight: bold;
`;

const WalkDuration = styled.p`
  font-weight: bold;
`;

const WalkStartTime = styled.p`
  font-weight: bold;
`;
const WalkCapacity = styled.p`
  font-weight: bold;
`;

export default Feed;
