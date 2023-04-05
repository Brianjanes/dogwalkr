import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AddFriend } from "./Components/AddFriend";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const Profile = ({ user, loggedInUser }) => {
  console.log(loggedInUser);
  return (
    <ProfileContainer>
      {Object.keys(loggedInUser).map((key) => {
        return (
          <ProfileCard key={key}>
            <ProfileImage src={loggedInUser[key].picture} />
            <ProfileInfo>
              <ProfileName>{loggedInUser[key].name}</ProfileName>
              <ProfileEmail>{loggedInUser[key].email}</ProfileEmail>
              <ProfileBio>{loggedInUser[key].bio}</ProfileBio>
            </ProfileInfo>
          </ProfileCard>
        );
      })}
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
  height: 80%;
  width: 70%;
  border-radius: 20px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.45);
`;
const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileName = styled.h1``;

const ProfileEmail = styled.h1``;

const ProfileBio = styled.h1``;

export default Profile;

// import { useAuth0 } from "@auth0/auth0-react";
// import styled from "styled-components";
// import React from "react";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const { user, isAuthenticated } = useAuth0();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkUser = async (providedUser) => {
//       try {
//         if (isAuthenticated) {
//           const response = await fetch("/user/add", {
//             method: "GET",
//             headers: {
//               Accept: "application/json",
//               "Content-type": "application/json",
//               "Access-Control-Allow-Origin": "*",
//             },
//           });
//           const data = await response.json();
//           if (data.inDB === true) {
//             setLoading(false);
//             console.log(data);
//             navigate("/register");
//           } else {
//             navigate("/register");
//           }
//         }
//       } catch (error) {
//         console.error("Error adding user:", error);
//       }
//     };
//     checkUser(user);
//   }, [isAuthenticated]);

//   return (
//     <Container>
//       {isAuthenticated && (
//         <>
//           <Button onSubmit={handleClick}>Edit Profile</Button>
//           {user?.picture && <ProfilePic src={user?.picture} alt={user?.name} />}
//           <UserName>{user?.name}</UserName>
//           <WholeList>
//             <List>
//               <UserInfo>User name: </UserInfo>
//               {user?.nickname}
//             </List>
//             <List>
//               <UserInfo>E-mail: </UserInfo>
//               {user?.email}
//             </List>
//             <List>
//               <UserInfo>Location: </UserInfo>
//               {user?.location}
//             </List>
//           </WholeList>
//         </>
//       )}
//     </Container>
//   );
// };

// const Button = styled.button`;
//   font-size: 1em;
//   padding: 10px 20px;
//   border: none;
//   border-radius: 5px;
//   background-color: #7635c4;
//   color: white;
//   cursor: pointer;
// `;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 500px;
// `;

// const ProfilePic = styled.img`
//   width: 200px;
//   height: 200px;
//   border-radius: 50%;
//   margin: 10px;
//   border: 2px solid black;
// `;

// const UserName = styled.div`
//   font-size: 2em;
//   margin-bottom: 10px;
// `;

// const WholeList = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;
// const UserInfo = styled.div`
//   font-size: 1em;
//   margin: 5px;
//   font-weight: bold;
// `;

// const List = styled.li`
//   display: flex;
//   align-items: center;
//   margin: 5px;
// `;

// export default Profile;
