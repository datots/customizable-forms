import React, { useState } from "react";
import axios from "axios";

const TemplateCreationForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [access, setAccess] = useState("public");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission and image upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("access", access);
    if (image) formData.append("image", image);

    try {
      await axios.post("/api/templates", formData);
      // Handle success (e.g., redirect or show success message)
    } catch (error) {
      console.error("Error creating template", error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Create Template</button>
    </form>
  );
};

export default TemplateCreationForm;
