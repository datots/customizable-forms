// TemplateManagement.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../services/Firebase";
import { collection, getDocs } from "firebase/firestore";

const TemplateManagement = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const templateCollection = await getDocs(collection(db, "templates"));
      setTemplates(
        templateCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchTemplates();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold">Template Management</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border">Template Name</th>
            <th className="border">Created By</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id}>
              <td className="border">{template.name}</td>
              <td className="border">{template.createdBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TemplateManagement;
