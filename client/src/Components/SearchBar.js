import React from "react";
import { FiSearch } from "react-icons/fi";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  //this is for a keydown event
  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      fetch(`search/${search}`)
        .then((response) => response.json())
        .then((data) => {
          setSearch(data.data);
          navigate(`/${search}`);
        });
    }
  };
  //this handles an on click for the icon button
  const handleSearchClick = () => {
    fetch(`search/${search}`)
      .then((response) => response.json())
      .then((data) => {
        setSearch(data.data);
        navigate(`/${search}`);
      });
  };

  return (
    <Wrapper>
      <SearchBarInput
        type="search"
        placeholder="Search for friends here"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => handleSearchEnter(e)}
      ></SearchBarInput>
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
