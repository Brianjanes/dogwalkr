import React from "react";
import styled from "styled-components";

const AddFriend = ({ loggedInUser, user }) => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
    fetch(`/addFriend/${user._id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loggedUserId: loggedInUser._id,
        targetUserId: user._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <>
      {loggedInUser && (
        <Button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Add friend
        </Button>
      )}
    </>
  );
};

const Button = styled.button`
  height: 25px;
  width: 100px;
  font-size: 1.1em;
`;

export default AddFriend;
