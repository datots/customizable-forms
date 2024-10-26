// useSearch.js
import { useState, useEffect } from "react";

const useSearch = (data, query) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      const filteredResults = data.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults(data);
    }
  }, [data, query]);

  return results;
};

export default useSearch;
