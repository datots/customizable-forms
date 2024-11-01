import React, { useEffect, useState } from "react";
import axios from "axios";
import TemplateForm from "../TemplatesForm/TemplateForm"; // Ensure the path is correct
import TemplateList from "../TemplatesForm/TemplateList"; // Ensure the path is correct

const TemplateManagement = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showTemplateForm, setShowTemplateForm] = useState(false);

  const TEMPLATE_API_URL =
    import.meta.env.VITE_TEMPLATE_API_URL ||
    "http://localhost:5000/api/templates"; // Ensure the endpoint is correct

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const response = await axios.get(TEMPLATE_API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTemplates(response.data);
    } catch (error) {
      setErrorMessage(
        error.response
          ? error.response.data.message
          : "Failed to fetch templates."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [TEMPLATE_API_URL]);

  const handleTemplateSubmit = async (templateData) => {
    try {
      const response = await axios.post(TEMPLATE_API_URL, templateData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTemplates((prevTemplates) => [...prevTemplates, response.data]);
      setSuccessMessage("Template created successfully!");
    } catch (error) {
      setErrorMessage(
        error.response
          ? error.response.data.message
          : "Failed to create template."
      );
    }
  };

  const deleteTemplate = async (id) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      setActionLoading(true);
      try {
        await axios.delete(`${TEMPLATE_API_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTemplates((prevTemplates) =>
          prevTemplates.filter((template) => template._id !== id)
        );
        setSuccessMessage("Template deleted successfully!");
      } catch (error) {
        setErrorMessage(
          error.response
            ? error.response.data.message
            : "Failed to delete template."
        );
      } finally {
        setActionLoading(false);
      }
    }
  };

  return (
    <div className="template-management">
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {errorMessage}
        </div>
      )}
      <button
        onClick={() => setShowTemplateForm((prev) => !prev)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {showTemplateForm ? "Hide Template Form" : "Show Template Form"}
      </button>
      {showTemplateForm && <TemplateForm onSubmit={handleTemplateSubmit} />}
      {loading ? (
        <p>Loading templates...</p>
      ) : (
        <TemplateList
          templates={templates}
          onDelete={deleteTemplate}
          loading={actionLoading}
        />
      )}
    </div>
  );
};

export default TemplateManagement;
