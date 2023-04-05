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
};

const Button = styled.button``;

export default AddFriend;
