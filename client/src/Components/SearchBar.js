import React from "react";
import { FiSearch } from "react-icons/fi";
import styled from "styled-components";
import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetch(`search/${search}`)
        .then((response) => response.json())
        .then((data) => setSearch(data.data));
      console.log(search);
    }
  };
  return (
    <Wrapper>
      <SearchBarInput
        type="search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => handleSearch(e)}
      ></SearchBarInput>
      <SearchIcon />
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
  font-size: 20px;
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

export default SearchBar;
