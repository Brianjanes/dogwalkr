import React, { useState } from "react";
import styled from "styled-components";

const ProfileModal = ({ handleUpdate, handleDelete, user }) => {
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

  return (
    <Container>
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
        <Button onClick={() => handleUpdate(formInformation)}>
          Save Changes
        </Button>
        <Button onClick={handleDelete}>Delete User</Button>
      </ButtonDiv>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  height: 500px;
  border-radius: 20px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.45);
  background-color: whitesmoke;
  position: fixed;
  top: 30%;
  bottom: 30%;
  left: 35%;
  right: 50%;
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
const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 20px;
  align-items: center;
`;
const Button = styled.button``;

export default ProfileModal;
