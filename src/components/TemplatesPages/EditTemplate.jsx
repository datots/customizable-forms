import React, { useEffect, useState } from "react";
import axios from "axios";

const TemplateEditForm = ({ templateId }) => {
  const [template, setTemplate] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [access, setAccess] = useState("public");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchTemplate = async () => {
      const response = await axios.get(`/api/templates/${templateId}`);
      setTemplate(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setAccess(response.data.access);
      setQuestions(response.data.questions);
    };
    fetchTemplate();
  }, [templateId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedTemplate = { title, description, access, questions };
    await axios.put(`/api/templates/${templateId}`, updatedTemplate);
    // Handle success (e.g., redirect or show success message)
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <select value={access} onChange={(e) => setAccess(e.target.value)}>
        <option value="public">Public</option>
        <option value="restricted">Restricted</option>
      </select>
      {/* Render questions and editing options here */}
      <button type="submit">Update Template</button>
    </form>
  );
};

export default TemplateEditForm;
