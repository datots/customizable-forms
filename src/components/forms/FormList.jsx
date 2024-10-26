// src/Forms/FormList.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Import your Firebase config
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const FormList = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const templatesCollection = collection(db, "templates");
      const templateSnapshot = await getDocs(templatesCollection);
      const templateList = templateSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTemplates(templateList);
    };

    fetchTemplates();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Templates</h1>
      <ul>
        {templates.map((template) => (
          <li key={template.id} className="border rounded p-4 mb-2">
            <Link to={`/templates/${template.id}`}>
              <h2 className="text-xl">{template.title}</h2>
              <p>{template.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormList;
