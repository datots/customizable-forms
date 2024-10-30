import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewTemplates = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const response = await axios.get("/api/templates");
      setTemplates(response.data);
    };
    fetchTemplates();
  }, []);

  return (
    <div>
      <h2>Available Templates</h2>
      {templates.map((template) => (
        <div key={template._id}>
          <h3>{template.title}</h3>
          <p>{template.description}</p>
          <button>Fill Template</button>
        </div>
      ))}
    </div>
  );
};

export default ViewTemplates;
