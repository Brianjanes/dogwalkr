import React from "react";
import styled from "styled-components";

const FriendButton = ({ handleFunction, title }) => {
  const handleClick = (e) => {
    e.preventDefault();
    handleFunction();
  };

  return (
    <Button
      onClick={(e) => {
        handleClick(e);
      }}
    >
      {title}
    </Button>
  );
};

const Button = styled.button``;

export default FriendButton;
