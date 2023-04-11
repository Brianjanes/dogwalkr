import React, { useEffect, useContext, useState } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import FriendButton from "../Components/FriendButton";
import { UserContext } from "../Context/UserContext";
// import UploadWidget from "../Components/UploadWidget";

const Profile = () => {
  const { loggedInUser } = useContext(UserContext);
  const [user, setUser] = useState([]);
  const userName = useParams().userName;
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const [refresh, setRefresh] = useState(false);

  const editProfile = (e) => {
    e.preventDefault();
    setUpdate(!update);
  };

  useEffect(() => {
    fetch(`/profile/${userName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log(data.data);
          setUser(data.data);
        }
      });
  }, [update, refresh]);

  const [formInformation, setFormInformation] = useState({
    firstName: "",
    lastName: "",
    image: "",
    bio: "",
  });

  const handleInputChange = (e) => {
    const { name } = e.target;
    if (name === "firstName") {
      setFormInformation({
        ...formInformation,
        firstName: e.target.value,
      });
    } else if (name === "lastName") {
      setFormInformation({
        ...formInformation,
        lastName: e.target.value,
      });
    } else if (name === "bio") {
      setFormInformation({
        ...formInformation,
        bio: e.target.value,
      });
    }
  };

  const handleUpdate = () => {
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
          setUpdate(!update);
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
          setUpdate(!update);
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
    }).then((response) => response.json());
    setRefresh(!refresh);
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
        if (data.status === 200) {
          setRefresh(!refresh);
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
            {!loggedInUser.friends.includes(user._id) ? (
              <FriendButton
                handleFunction={handleAddFriend}
                title="Add Friend"
              />
            ) : (
              <FriendButton
                handleFunction={handleRemoveFriend}
                title="Remove Friend"
              />
            )}
          </LeftSide>
          <RightSide>
            {update ? (
              <>
                <Update>
                  First name:
                  <NameInput
                    placeholder={user.firstName}
                    name="firstName"
                    type="text"
                    onChange={(e) => handleInputChange(e)}
                  />
                </Update>
                <Update>
                  Last Name:
                  <NameInput
                    placeholder={user.lastName}
                    name="lastName"
                    type="text"
                    onChange={(e) => handleInputChange(e)}
                  />
                </Update>
                <Update>
                  Bio:
                  <BioInput
                    placeholder="Update your existing bio here!"
                    name="bio"
                    type="text"
                    onChange={(e) => handleInputChange(e)}
                  />
                </Update>
                <ButtonDiv>
                  <Button onClick={handleUpdate}>Save Changes</Button>
                  <Button onClick={handleDelete}>Delete User</Button>
                </ButtonDiv>
              </>
            ) : (
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
            )}
            {!update && loggedInUser && loggedInUser.userName === userName && (
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
const Update = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;
const NameInput = styled.input`
  font-size: 20px;
  height: 30px;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
`;
const BioInput = styled.textarea`
  font-size: 1em;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
  min-width: 300px;
  min-height: 100px;
  margin: 5px;
  font-family: "Roboto", sans-serif;
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
const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
`;
export default Profile;
