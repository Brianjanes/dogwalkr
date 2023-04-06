import React from "react";
import styled from "styled-components";
import glen from "../Images/glen.jpg";

const UserThumbnail = ({ name, avatar }) => {
  return (
    <Wrapper>
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
  width: 4rem;
  height: 4rem;
`;

const UserName = styled.h1``;

export default UserThumbnail;
