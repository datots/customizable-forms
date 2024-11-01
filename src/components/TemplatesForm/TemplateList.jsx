import React from "react";

const TemplateList = ({ templates, onDelete }) => {
  return (
    <div className="border mt-4">
      <h2 className="text-xl p-2 bg-gray-100">Templates</h2>
      {templates.length === 0 ? (
        <div className="p-2">No templates available.</div>
      ) : (
        templates.map((template) => (
          <div key={template._id} className="flex justify-between p-2 border-b">
            <div>
              <strong>{template.name}</strong>: {template.description}
            </div>
            <div>
              <button
                onClick={() => onDelete(template._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TemplateList;
