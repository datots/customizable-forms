// TemplatePage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../services/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

const TemplatePage = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplate = async () => {
      const templateDoc = doc(db, "templates", templateId);
      const templateSnapshot = await getDoc(templateDoc);

      if (templateSnapshot.exists()) {
        setTemplate({ id: templateSnapshot.id, ...templateSnapshot.data() });
      } else {
        console.error("No such template!");
      }
      setLoading(false);
    };

    fetchTemplate();
  }, [templateId]);

  const handleDelete = async () => {
    const templateDoc = doc(db, "templates", templateId);
    await deleteDoc(templateDoc);
    navigate("/user"); // Redirect to the user page after deletion
  };

  if (loading) return <p>Loading...</p>;
  if (!template) return <p>Template not found.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{template.title}</h1>
      <p>{template.description}</p>
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white px-4 py-2"
      >
        Delete Template
      </button>
      {/* Additional management functionality (edit, etc.) can be added here */}
    </div>
  );
};

export default TemplatePage;
