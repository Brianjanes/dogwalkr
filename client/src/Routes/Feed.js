import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import styled from "styled-components";
import NewWalk from "../Modal/NewWalk";
import SearchBar from "../Components/SearchBar";
import UserThumbnail from "../Components/UserThumbnail";
import LoadingSpinner from "../Components/LoadingSpinner";

//feed page route.
//would like to expand on walk history, clean up some logic for images, and walk time related things.

function Feed() {
  const { loggedInUser } = useContext(UserContext);
  const [modal, setModal] = useState(false);
  const [walks, setWalks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("/walks")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setWalks(data.data);
        }
      });
    fetch("/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data);
      });
    if (loggedInUser) {
      fetch(`/friends/${loggedInUser._id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setFriends(data.data);
          }
        });
    }
  }, [modal, refresh, loggedInUser]);

  const handleClick = (e) => {
    e.preventDefault();
    setModal(!modal);
  };

  const handleDeleteWalk = (e, _id) => {
    e.preventDefault();
    fetch(`/deleteWalk/${_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: loggedInUser.userName,
        _id: _id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setRefresh(!refresh);
        }
      });
  };

  const handleJoinWalk = (e, _id) => {
    e.preventDefault();
    fetch(`/joinWalk/${_id}`, {
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
        if (data.status === 200) {
          setRefresh(!refresh);
        }
      });
  };

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
              <Button onClick={(e) => handleClick(e)}>New Walk</Button>
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
                return (
                  <WalkPost key={walk._id}>
                    <WalkHostImage src={walk.image} />
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
                        <Button onClick={(e) => handleJoinWalk(e, walk._id)}>
                          Join Walk
                        </Button>
                      ) : (
                        <Button onClick={(e) => handleDeleteWalk(e, walk._id)}>
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
                <SearchBar users={users} />
              </SearchDiv>
              <Friends>
                {friends?.map((friend) => {
                  return (
                    <div key={friend._id + 1}>
                      <UserThumbnail
                        userName={friend.userName}
                        user={friend}
                        name={friend.firstName}
                        avatar={friend.image}
                      />
                    </div>
                  );
                })}
              </Friends>
            </TopRight>
            <WalkHistory>
              <p>Walk History</p>
              <p>Coming soon!</p>
            </WalkHistory>
          </RightSide>
        </>
      )}
    </Wrapper>
  );
}
const WalkKey = styled.span`
  font-weight: bold;
`;
const WalkInfo = styled.div``;
const TimeOfPost = styled.div`
  font-size: 0.75rem;
`;
const WalkHostImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  margin: 10px;
  border: 1px solid #c2c2d6;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 45%;
  gap: 0.5rem;
  margin-left: 0.5rem;
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
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1.5em 2em 0px 0px;
`;
const Button = styled.button``;
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
  font-size: 3rem;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  justify-content: flex-start;
  align-items: flex-start;
  height: 90%;
  width: 100%;
`;

export default Feed;
