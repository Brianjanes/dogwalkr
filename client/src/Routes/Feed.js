import React from "react";
import { useState } from "react";
import styled from "styled-components";
import NewWalk from "../Modal/NewWalk";
import { useEffect } from "react";
import SearchBar from "../Components/SearchBar";
import UserThumbnail from "../Components/UserThumbnail";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "../Components/LoadingSpinner";

const Feed = ({ loggedInUser }) => {
  const [modal, setModal] = useState(false);
  const [walks, setWalks] = useState([]);
  const { isAuthenticated } = useAuth0();
  const [refresh, setRefresh] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setModal(!modal);
  };

  useEffect(() => {
    fetch("/walks")
      .then((response) => response.json())
      .then((data) => {
        setWalks(data.data);
      });
  }, [modal, refresh]);

  return (
    <Wrapper>
      {!loggedInUser ? (
        <LoadingDiv>
          <LoadingSpinner />
        </LoadingDiv>
      ) : (
        <>
          <LeftSide>
            <ButtonDiv>
              <Button onClick={(e) => handleClick(e)}>Create New Walk</Button>
              {modal && (
                <NewWalk
                  loggedInUser={loggedInUser}
                  modal={modal}
                  setModal={setModal}
                />
              )}
            </ButtonDiv>
            <WalkCard>
              {walks?.map((walk) => {
                const handleDeleteWalk = (e) => {
                  e.preventDefault();
                  fetch(`/deleteWalk/${walk._id}`, {
                    method: "DELETE",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      userName: loggedInUser.userName,
                      _id: walk._id,
                    }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      if (data.status === 200) {
                        setRefresh(!refresh);
                      }
                    });
                };

                const handleJoinWalk = (e) => {
                  e.preventDefault();
                  console.log(walk._id);
                  fetch(`/joinWalk/${walk._id}`, {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      userName: loggedInUser.userName,
                    }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data.data);
                    });
                };

                return (
                  <WalkPost key={walk._id}>
                    {/* <WalkHostImage src={walk.userName.image} /> */}
                    <Column>
                      <WalkInfo>
                        <WalkKey>UserName: </WalkKey> {walk.userName}
                      </WalkInfo>
                      <WalkInfo>
                        <WalkKey>Location: </WalkKey> {walk.location}
                      </WalkInfo>
                      <WalkInfo>
                        <WalkKey>Start time: </WalkKey> {walk.startTime}
                      </WalkInfo>
                      <WalkInfo>
                        <WalkKey>End Time: </WalkKey> {walk.endTime}
                      </WalkInfo>
                      <WalkInfo>
                        <WalkKey>Participants: </WalkKey>
                        {walk.attendees.length}
                      </WalkInfo>
                    </Column>
                    <Bottom>
                      {walk.userName !== loggedInUser.userName ? (
                        <Button onClick={(e) => handleJoinWalk(e)}>
                          Join Walk
                        </Button>
                      ) : (
                        <Button
                          onClick={(e) => {
                            handleDeleteWalk(e);
                          }}
                        >
                          Cancel Walk
                        </Button>
                      )}
                      <PostTime>
                        <TimeOfPost>
                          <Time>Posted at:</Time> {walk.dateTime}
                        </TimeOfPost>
                      </PostTime>
                    </Bottom>
                  </WalkPost>
                );
              })}
            </WalkCard>
          </LeftSide>
          <RightSide>
            <TopRight>
              <SearchDiv>
                <SearchBar />
              </SearchDiv>
              <Friends>
                {loggedInUser &&
                  isAuthenticated &&
                  loggedInUser.friends?.map((friend) => {
                    return (
                      <UserThumbnail
                        key={friend._id}
                        user={friend}
                        name={friend.firstName}
                        avatar={friend.image}
                      />
                    );
                  })}
              </Friends>
            </TopRight>
            <WalkHistory>Walk History</WalkHistory>
          </RightSide>
        </>
      )}
    </Wrapper>
  );
};
const WalkKey = styled.span`
  font-weight: bold;
`;
const WalkInfo = styled.div``;
const TimeOfPost = styled.div`
  font-size: 0.75rem;
`;
const WalkHostImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px;
  border: 1px solid #c2c2d6;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 45%;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  width: 85%;
  height: 90%;
`;
const LoadingDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: top;
  justify-content: flex-start;
  background-color: whitesmoke;
  height: 100%;
  width: 45%;
  border-radius: 20px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.45);
`;
const WalkCard = styled.div`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1.5em 2em 0px 0px;
`;
const Button = styled.button`
  font-size: 1em;
  padding: 10px 20px;
  margin: 10px;
`;
const WalkPost = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 96%;
  height: 120px;
  margin: 10px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.45);
`;
const PostTime = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
const Time = styled.span`
  font-weight: bold;
  padding: 5px;
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
`;

//right side of the page
const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  height: 100%;
  gap: 1.5rem;
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
  gap: 1.5rem;
  background-color: whitesmoke;
  height: 100%;
  width: 100%;
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
const Friends = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 90%;
  width: 100%;
`;

export default Feed;
