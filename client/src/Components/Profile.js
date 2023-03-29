import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <Article>
        {user?.picture && <ProfilePic src={user.picture} alt={user?.name} />}
        <UserName>{user?.name}</UserName>
        <WholeList>
          {Object.keys(user).map((ObjKey, i) => (
            <List key={i}>
              <KeyItem>{ObjKey.toUpperCase()}</KeyItem> :
              <UserInfo>{user[ObjKey]}</UserInfo>
            </List>
          ))}
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

const KeyItem = styled.div`
  font-size: 1em;
  font-weight: bold;
  margin: 5px;
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
`;

const List = styled.li`
  display: flex;
  margin: 5px;
`;

export default Profile;
