import React from "react";
import { useState } from "react";
import styled from "styled-components";
import NewWalk from "./Modal/NewWalk";
import { useEffect } from "react";
import SearchBar from "./Components/SearchBar";

const Feed = ({ loggedInUser }) => {
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
      {modal && (
        <NewWalk
          loggedInUser={loggedInUser}
          modal={modal}
          setModal={setModal}
        />
      )}

      <LeftSide>
        <ButtonDiv>
          <NewWalkButton onClick={(e) => handleClick(e)}>
            Create New Walk
          </NewWalkButton>
        </ButtonDiv>
        {walks.map((walk) => {
          return (
            <WalkDiv key={walk._id}>
              <WalkUserName> Username: {walk.userName}</WalkUserName>
              <WalkLocation>Location: {walk.location}</WalkLocation>
              <WalkStartTime>Start time: {walk.startTime}</WalkStartTime>
              <WalkDuration>End Time: {walk.endTime}</WalkDuration>
              <WalkCapacity>Number of Walkers:{walk.capacity}</WalkCapacity>
              <PostTime>Posted Time: {walk.dateTime}</PostTime>
              <JoinWalkButton>Join Walk</JoinWalkButton>
            </WalkDiv>
          );
        })}
      </LeftSide>
      <RightSide>
        <TopRight>
          <SearchDiv>
            <FindFriends>Search for Friends!</FindFriends>
            <SearchBar />
          </SearchDiv>
          <Friends>Friends will go in here!</Friends>
        </TopRight>
        <WalkHistory>Walk History</WalkHistory>
      </RightSide>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 85%;
  height: 90%;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
  height: 100%;
  width: 45%;
  border-radius: 20px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.45);
  overflow-y: scroll;
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const NewWalkButton = styled.button`
  font-size: 1em;
  padding: 10px 20px;
  margin: 10px;
`;

const JoinWalkButton = styled.button`
  font-size: 1em;
  padding: 7px 15px;
  margin: 10px;
`;
const WalkDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  width: 85%;
  margin: 10px;
  padding: 10px;
`;

const WalkUserName = styled.p`
  font-weight: bold;
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
const PostTime = styled.p``;

//right side of the page
const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  height: 100%;
  gap: 20px;
`;
const WalkHistory = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  background-color: whitesmoke;
  border-radius: 20px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.45);
`;
const TopRight = styled.div`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  height: 100%;
  border-radius: 20px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.45);
  overflow-y: scroll;
`;
const SearchDiv = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20%;

  background-color: whitesmoke;
`;
const FindFriends = styled.p`
  display: flex;
  font-weight: bold;
  font-size: 1.5em;
`;
const Friends = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 90%;
  width: 90%;
`;

export default Feed;
