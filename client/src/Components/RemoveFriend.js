import React from "react";
import styled from "styled-components";

const RemoveFriend = ({ loggedInUser, user }) => {
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
          Remove friend
        </Button>
      )}
    </>
  );
};

const Button = styled.button`
  height: 25px;
  width: 150px;
  margin: 10px;
  font-size: 1.1em;
`;

export default RemoveFriend;
