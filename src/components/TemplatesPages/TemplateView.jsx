import React from "react";

const TemplateView = ({ template }) => {
  return (
    <div>
      <h2>{template.title}</h2>
      <p>{template.description}</p>
      {/* Add more details and rendering options here */}
    </div>
  );
};

export default TemplateView;
