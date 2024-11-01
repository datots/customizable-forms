import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAggregatedResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get("/api/aggregated-results");
        console.log("API Response:", response.data); // Log the API response
        setResults(response.data); // Adjust if necessary based on API response structure
      } catch (error) {
        console.error("Error fetching aggregated results:", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div>
      <h2 className="mt-6 text-xl font-semibold">Aggregated Results</h2>
      {Array.isArray(results) && results.length > 0 ? (
        results.map((result) => (
          <div key={result.id}>
            <h3>{result.templateTitle}</h3>
            {/* Show metrics or visualizations */}
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default ViewAggregatedResults;
