import React, { useEffect, useContext, useState } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import FriendButton from "../Components/FriendButton";
import { UserContext } from "../Context/UserContext";
import ProfileModal from "../Modal/ProfileModal";
// import UploadWidget from "../Components/UploadWidget";

const Profile = () => {
  const { loggedInUser } = useContext(UserContext);
  const [user, setUser] = useState([]);
  const userName = useParams().userName;
  const [updateProfile, setUpdateProfile] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const [refresh, setRefresh] = useState(false);

  const editProfile = (e) => {
    e.preventDefault();
    setUpdateProfile(!updateProfile);
  };

  useEffect(() => {
    fetch(`/profile/${userName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setUser(data.data);
        }
      });
  }, [refresh, updateProfile]);

  const handleUpdate = (formInformation) => {
    console.log(formInformation);
    fetch(`/updateProfile/${userName}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInformation),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 200) {
          setUpdateProfile(!updateProfile);
          setRefresh(!refresh);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const handleDelete = async () => {
    await fetch(`/delete/${loggedInUser.userName}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((status) => {
        if (status.status === 200) {
          setUpdateProfile(!updateProfile);
          logout();
          navigate("/");
        }
      });
  };

  const handleAddFriend = () => {
    fetch(`/addFriend`, {
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
        if (data.status === 200) {
          setRefresh(!refresh);
          setUser({ ...user, friends: [...user.friends, loggedInUser._id] });
        }
      });
  };

  const handleRemoveFriend = () => {
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
        console.log(data.status);
        if (data.status === 200) {
          setRefresh(!refresh);
          setUser({
            ...user,
            friends: user.friends.filter((id) => id !== loggedInUser._id),
          });
        }
      });
  };

  return (
    <ProfileContainer>
      {!loggedInUser ? (
        <LoadingDiv>
          <LoadingSpinner />
        </LoadingDiv>
      ) : (
        <Wrapper>
          <LeftSide>
            <ProfileImage src={user.image} />
            {loggedInUser.userName !== user.userName ? (
              !loggedInUser.friends.includes(user._id) ? (
                <FriendButton
                  handleFunction={handleAddFriend}
                  title="Add Friend"
                />
              ) : (
                <FriendButton
                  handleFunction={handleRemoveFriend}
                  title="Remove Friend"
                />
              )
            ) : (
              <p>oi! it's {loggedInUser.userName} mate</p>
            )}
          </LeftSide>
          {updateProfile && (
            <ProfileModal
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              user={user}
            />
          )}
          <RightSide>
            <ProfileInfo>
              <UserInfo>
                {user.firstName} {user.lastName}
              </UserInfo>
              <UserInfo>
                <Pin />
                {user.location}
              </UserInfo>
              <UserInfo>{user.bio}</UserInfo>
            </ProfileInfo>

            {loggedInUser && loggedInUser.userName === userName && (
              <Button
                onClick={(e) => {
                  editProfile(e);
                }}
              >
                Edit Profile
              </Button>
            )}
          </RightSide>
        </Wrapper>
      )}
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
  height: 80%;
  width: 70%;
  border-radius: 20px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.45);
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoadingDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProfileImage = styled.img`
  width: 225px;
  height: 225px;
  border-radius: 50%;
  border: 2px solid #c2c2d6;
  margin: 20px;
`;
const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UserInfo = styled.h1`
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Pin = styled(FiMapPin)`
  margin: 5px;
`;
const Button = styled.button``;

export default Profile;
