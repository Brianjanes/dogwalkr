import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//this component is for searcing through your friends list.
//as of july 25th/2023 this doesn't have a drop down delector but i would like to add one

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const searchUser = () => {
    // Perform search logic here, and then navigate if needed
    fetch(`search/${search}`)
      .then((response) => response.json())
      .then((data) => {
        setSearch("");
        navigate(`/${search}`);
      });
  };

  //this is for a keydown event
  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      searchUser();
    }
  };
  //this handles an on click for the icon button
  const handleSearchClick = () => {
    searchUser();
  };

  return (
    <Wrapper>
      <SearchBarInput
        type="search"
        placeholder="Search for friends here"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => handleSearchEnter(e)}
      />
      <datalist id="user-list">
        {" "}
        {/* This is the datalist */}
        {users.map((user, index) => (
          <option key={index} value={user} />
        ))}
      </datalist>
      <SearchDiv onClick={handleSearchClick}>
        <SearchIcon />
      </SearchDiv>
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
  font-size: 30px;
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
  width: 300px;
  height: 30px;
  margin: 5px;
  padding: 10px;
  border-radius: 10px;
  font-size: 1em;
`;

export default SearchBar;
