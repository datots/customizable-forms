import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewFilledForms = () => {
  const [filledForms, setFilledForms] = useState([]);

  useEffect(() => {
    const fetchFilledForms = async () => {
      try {
        const response = await axios.get("/api/filled-forms");
        setFilledForms(response.data);
      } catch (error) {
        console.error("Error fetching filled forms:", error);
      }
    };

    fetchFilledForms();
  }, []);

  // Check if filledForms is an array
  if (!Array.isArray(filledForms)) {
    return <div>No filled forms available</div>; // Handle when no forms are available
  }

  return (
    <div>
      <h2 className="mt-6 text-xl font-semibold">Your Filled Forms</h2>
      <ul>
        {filledForms.map((form) => (
          <li key={form.id} className="mb-2">
            {form.templateTitle}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewFilledForms;
