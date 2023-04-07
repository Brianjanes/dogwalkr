import React from "react";
import styled from "styled-components";
import glen from "../Images/glen.jpg";
import { useNavigate } from "react-router-dom";

const UserThumbnail = ({ name, avatar }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/profile/glen");
  };

  return (
    <Wrapper
      onClick={(e) => {
        handleClick(e);
      }}
    >
      <ImageBox>
        <img src={glen} />
      </ImageBox>
      <UserName>{name}</UserName>
    </Wrapper>
  );
};

const ImageBox = styled.div`
  img {
    display: block;
    max-width: 230px;
    max-height: 95px;
    width: auto;
    height: auto;
    border-radius: 50%;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 7rem;
  border-radius: 10%;
  margin: 1rem;
  &:hover {
    cursor: pointer;
    background-color: #9595b7;
  }
`;

const UserName = styled.div`
  font-weight: bold;
`;

export default UserThumbnail;
