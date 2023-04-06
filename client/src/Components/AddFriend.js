import React from "react";
import styled from "styled-components";

const AddFriend = () => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
    fetch("/friends")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <Button
      onClick={(e) => {
        handleClick(e);
      }}
    >
      Add friend
    </Button>
  );
};

const Button = styled.button`
  color: white;
  height: 25px;
  width: 100px;
  font-size: 1.1em;
  border-radius: 12px;
  background-color: #7635c4;
  &:hover {
    cursor: pointer;
    border: none;
  }
`;

export default AddFriend;
