import React, { useEffect, useState } from "react";
import axios from "axios";

const TemplateList = () => {
  const [templates, setTemplates] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get("/api/templates"); // Replace with your actual endpoint
        console.log(response.data); // Log to inspect the data structure
        setTemplates(response.data); // Expecting an array in response.data
      } catch (error) {
        console.error("Error fetching templates:", error);
        setError("Could not fetch templates."); // Handle error
      }
    };

    fetchTemplates();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Available Templates</h1>
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Display error if any */}
      <ul className="mt-4">
        {Array.isArray(templates) ? (
          templates.map((template) => (
            <li key={template.id} className="border p-4 mb-2 rounded">
              <h2 className="font-semibold">{template.title}</h2>
              <p>{template.description}</p>
            </li>
          ))
        ) : (
          <p>No templates available.</p>
        )}
      </ul>
    </div>
  );
};

export default TemplateList;
