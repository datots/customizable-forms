// src/Forms/FormTemplate.jsx
import React, { useState } from "react";
import { createFormTemplate } from "../services/formService"; // Import function from formService

const FormTemplate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { title: "", type: "text", description: "" },
  ]);
  const [message, setMessage] = useState("");

  // Add a new question to the form
  const handleAddQuestion = () => {
    setQuestions([...questions, { title: "", type: "text", description: "" }]);
  };

  // Save the form template to Firestore using createFormTemplate from formService
  const handleSaveTemplate = async () => {
    if (!title.trim() || !description.trim()) {
      setMessage("Please fill out the title and description.");
      return;
    }
    try {
      await createFormTemplate({ title, description, questions });
      setMessage("Template saved successfully!");
      // Reset form after successful submission
      setTitle("");
      setDescription("");
      setQuestions([{ title: "", type: "text", description: "" }]);
    } catch (error) {
      setMessage("Error saving template.");
      console.error("Error adding document: ", error);
    }
  };

  // Update question values based on input
  const handleQuestionChange = (index, key, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][key] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Template</h1>

      {/* Display success or error message */}
      {message && <div className="text-center text-red-500">{message}</div>}

      {/* Template title */}
      <input
        type="text"
        placeholder="Template Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded p-2 mb-2 w-full"
      />

      {/* Template description */}
      <textarea
        placeholder="Template Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded p-2 mb-2 w-full"
      />

      {/* List of questions */}
      {questions.map((question, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            placeholder="Question Title"
            value={question.title}
            onChange={(e) =>
              handleQuestionChange(index, "title", e.target.value)
            }
            className="border rounded p-2 mb-2 w-full"
          />
          <textarea
            placeholder="Question Description"
            value={question.description}
            onChange={(e) =>
              handleQuestionChange(index, "description", e.target.value)
            }
            className="border rounded p-2 mb-2 w-full"
          />
          <select
            value={question.type}
            onChange={(e) =>
              handleQuestionChange(index, "type", e.target.value)
            }
            className="border rounded p-2 w-full"
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
          </select>
        </div>
      ))}

      {/* Add Question button */}
      <button
        onClick={handleAddQuestion}
        className="bg-blue-500 text-white p-2 rounded mr-2"
      >
        Add Question
      </button>

      {/* Save Template button */}
      <button
        onClick={handleSaveTemplate}
        className="bg-green-500 text-white p-2 rounded mt-4"
      >
        Save Template
      </button>
    </div>
  );
};

export default FormTemplate;
