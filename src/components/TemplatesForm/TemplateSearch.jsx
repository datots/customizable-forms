import React, { useState } from "react";
import { fetchTemplates } from "../../services/api";

const TemplateSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await fetchTemplates(query);
    setResults(data);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search templates"
      />
      <button type="submit">Search</button>
      <div>
        {results.map((template) => (
          <div key={template.id}>{template.title}</div>
        ))}
      </div>
    </form>
  );
};

export default TemplateSearch;
