import React from "react";
import styled from "styled-components";

// this is for removing a friend from your friends list

const RemoveFriend = ({ loggedInUser, user, refresh, setRefresh }) => {
  const handleClick = (e) => {
    e.preventDefault();
    fetch(`/deleteFriend`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loggedUserId: loggedInUser._id,
        targetUserId: user._id,
      }),
    }).then((response) => response.json());
    setRefresh(!refresh);
  };

  return (
    <>
      {loggedInUser && (
        <Button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Remove friend
        </Button>
      )}
    </>
  );
};

const Button = styled.button``;

export default RemoveFriend;
