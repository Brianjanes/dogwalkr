import React from "react";
import styled from "styled-components";
import tom from "../Images/tom.jpg";
import { useNavigate } from "react-router-dom";

const UserThumbnail = ({ user, name, avatar, userName }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/${userName}`);
  };

  return (
    <Wrapper
      onClick={(e) => {
        handleClick(e);
      }}
    >
      <ImageBox>
        <img src={avatar} />
      </ImageBox>
      <UserName>{name}</UserName>
    </Wrapper>
  );
};

const ImageBox = styled.div`
  img {
    display: block;
    max-width: 6rem;
    max-height: 5rem;
    width: auto;
    height: auto;
    border-radius: 10px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 6.5rem;
  height: 7rem;
  border-radius: 10%;
  margin: 0.75rem;
  border: 1px solid black;
  &:hover {
    cursor: pointer;
    border: 2px solid #9595b7;
  }
`;

const UserName = styled.div`
  font-weight: bold;
  margin: 0.5rem 0rem 0.2rem 0rem;
`;

export default UserThumbnail;
