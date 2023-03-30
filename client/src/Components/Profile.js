import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import React from "react";
import { useState, useEffect } from "react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    fetch("/users", { method: "post" })
      .then((response) => response.json())
      .then((data) => {
        setCurrentUser(data.data);
      });
  }, []);
  // console.log(currentUser);
  return (
    isAuthenticated && (
      <Article>
        {user?.picture && <ProfilePic src={user?.picture} alt={user?.name} />}
        <UserName>{user?.name}</UserName>
        <WholeList>
          <List>
            <UserInfo>NickName: </UserInfo>
            {user?.nickname}
          </List>
          <List>
            <UserInfo>E-mail: </UserInfo>
            {user?.email}
          </List>
          <List>
            <UserInfo>Location: </UserInfo>
            {user?.location}
          </List>
        </WholeList>
      </Article>
    )
  );
};

const Article = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
`;

const ProfilePic = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 10px;
  border: 2px solid black;
`;

const UserName = styled.div`
  font-size: 2em;
  margin-bottom: 10px;
`;

const WholeList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const UserInfo = styled.div`
  font-size: 1em;
  margin: 5px;
  font-weight: bold;
`;

const List = styled.li`
  display: flex;
  align-items: center;
  margin: 5px;
`;

export default Profile;
