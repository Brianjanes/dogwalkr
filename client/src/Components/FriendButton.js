import React from "react";
import styled from "styled-components";

const FriendButton = ({ handleAddFriend, handleRemoveFriend, areFriends }) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (areFriends) {
      handleRemoveFriend();
    } else if (!areFriends) {
      handleAddFriend();
    }
  };

  //a reuseable button that checks if the user is friends with the specified user or not.
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
