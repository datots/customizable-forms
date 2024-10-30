import React, { useEffect, useState } from "react";
import axios from "axios";
import TemplateView from "./TemplateView";

const TemplateList = () => {
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
      {templates.map((template) => (
        <TemplateView key={template._id} template={template} />
      ))}
    </div>
  );
};

export default TemplateList;
