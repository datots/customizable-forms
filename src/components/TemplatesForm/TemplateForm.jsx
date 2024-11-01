import React, { useState } from "react";

const TemplateForm = ({ onSubmit, templateData }) => {
  const [name, setName] = useState(templateData ? templateData.name : "");
  const [description, setDescription] = useState(
    templateData ? templateData.description : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const template = { name, description };
    onSubmit(template);
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 mb-4">
      <h2 className="text-xl mb-2">
        {templateData ? "Edit Template" : "New Template"}
      </h2>
      <div className="mb-2">
        <label className="block mb-1">Template Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-2 py-1 w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded px-2 py-1 w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {templateData ? "Update Template" : "Create Template"}
      </button>
    </form>
  );
};

export default TemplateForm;
