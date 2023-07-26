import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//this component is for searcing through your friends list.
//as of july 25th/2023 this doesn't have a drop down autocomplete but i would like to add one
//added autocomplete as of july 26th/2023. the user stil has to click the icon or press enter after they select a username to search.

const SearchBar = ({ users }) => {
  const [search, setSearch] = useState("");
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
        list="user-list"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => handleSearchEnter(e)}
        autocomplete="off"
      />
      {/* this is to create an autocomplete - and to only have it appear after the user has typed 2 characters. */}
      {users && search.length >= 2 && (
        <DatalistWrapper>
          <datalist id="user-list">
            {users.map((user, index) => (
              <option key={index} value={user.userName} />
            ))}
          </datalist>
        </DatalistWrapper>
      )}

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
  margin: 0.7rem;
  position: relative;
`;

const DatalistWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
`;

const SearchIcon = styled(FiSearch)`
  font-size: 1.3rem;
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
  width: 18rem;
  margin: 0.3px;
  padding: 0.4rem;
  border-radius: 0.5rem;
  font-size: 1rem;
`;

export default SearchBar;
