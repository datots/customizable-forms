// src/components/TemplateSettings.jsx
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";

const TemplateSettings = ({ templateId }) => {
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the template settings when the component mounts
  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await axios.get(`/api/template/${templateId}`);
        setTemplate(response.data);
      } catch (error) {
        console.error("Error fetching template settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [templateId]);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      await axios.put(`/api/template/${templateId}`, values);
      alert("Template settings updated successfully!");
    } catch (error) {
      console.error("Error updating template settings:", error);
      alert("Failed to update template settings.");
    }
  };

  // If still loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="mt-6 text-xl font-semibold">Template Settings</h2>
      <Formik
        initialValues={{
          title: template.title,
          description: template.description,
          // Add more fields as needed
        }}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="space-y-4">
            <div>
              <label className="block mb-1" htmlFor="title">
                Template Title
              </label>
              <Field
                id="title"
                name="title"
                placeholder="Enter template title"
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-1" htmlFor="description">
                Template Description
              </label>
              <Field
                id="description"
                name="description"
                placeholder="Enter template description"
                component="textarea"
                className="border p-2 w-full h-24"
              />
            </div>
            {/* Add more fields for settings management as needed */}
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Update Settings
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TemplateSettings;
