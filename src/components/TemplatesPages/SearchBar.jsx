import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ setSearchResults }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    const response = await axios.get(`/api/templates/search?q=${query}`);
    setSearchResults(response.data);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search templates..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
