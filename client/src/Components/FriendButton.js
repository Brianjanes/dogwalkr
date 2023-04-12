import React from "react";
import styled from "styled-components";

const FriendButton = ({ handleAddFriend, handleRemoveFriend, areFriends }) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (areFriends) {
      handleRemoveFriend();
    } else {
      handleAddFriend();
    }
  };

  return (
    <Button
      onClick={(e) => {
        handleClick(e);
      }}
    >
      {areFriends ? "Remove Friend" : "Add Friend"}
    </Button>
  );
};

const Button = styled.button``;

export default FriendButton;
