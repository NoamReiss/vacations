import React, { ChangeEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";

interface SearchBarProps {
  query: string;
  onQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar(props: SearchBarProps): JSX.Element {
  return (
    <div className="SearchBar">
      <div className="input-container">
        <SearchIcon className="search-icon" />
        <input
          type="text"
          placeholder="Search Vacationly"
          value={props.query}
          onChange={props.onQueryChange}
        />
      </div>
    </div>
  );
}

export default SearchBar;
