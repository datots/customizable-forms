import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageTemplates = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch("/api/template"); // Use fetch API here
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Ensure data is an array
        if (!Array.isArray(data)) {
          throw new Error("Data fetched is not an array");
        }
        setTemplates(data); // Set state with the fetched data
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/template/${id}`);
      // Update state to remove the deleted template
      setTemplates((prevTemplates) =>
        prevTemplates.filter((template) => template._id !== id)
      );
      alert("Template deleted successfully!");
    } catch (error) {
      console.error("Error deleting template:", error);
      alert("Failed to delete template.");
    }
  };

  return (
    <div>
      <h2 className="mt-6 text-xl font-semibold">Manage Templates</h2>
      <ul>
        {Array.isArray(templates) && templates.length > 0 ? (
          templates.map((template) => (
            <li key={template._id} className="mb-2">
              <span>{template.title}</span>
              <button
                onClick={() => handleDelete(template._id)}
                className="text-red-600 ml-2"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <li>No templates found.</li>
        )}
      </ul>
    </div>
  );
};

export default ManageTemplates;
