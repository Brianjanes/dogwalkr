import React from "react";
import { FiSearch } from "react-icons/fi";
import styled from "styled-components";
import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  //this is for a keydown event
  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      fetch(`search/${search}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(search);
          setSearch(data.data);
          setUsers(data.users);
        });
    }
  };
  //this handles an on click for the icon button
  const handleSearchClick = () => {
    fetch(`search/${search}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(search);
        setSearch(data.data);
        setUsers(data.users);
      });
  };
  const UserDropdown = ({ users }) => {
    return (
      <Dropdown>
        {users.map((user) => (
          <DropdownItem key={user.id}>{user.name}</DropdownItem>
        ))}
      </Dropdown>
    );
  };

  return (
    <Wrapper>
      <SearchBarInput
        type="search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => handleSearchEnter(e)}
      ></SearchBarInput>
      <SearchDiv onClick={handleSearchClick}>
        <SearchIcon />
      </SearchDiv>
      {users > 0 && <UserDropdown users={users} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const SearchIcon = styled(FiSearch)`
  font-size: 25px;
  &:hover {
    cursor: pointer;
  }
`;

const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBarInput = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 40px;
  margin: 5px;
  padding: 5px;
  border-radius: 10px;
  font-family: "Courier New", Courier, monospace;
`;

const Dropdown = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 35px;
  margin: 5px;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 35px;
`;

export default SearchBar;
