// src/Forms/FormDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase"; // Import your Firebase config
import { doc, getDoc } from "firebase/firestore";
import Comments from "./Comments";

const FormDetails = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      const templateDoc = doc(db, "templates", id);
      const templateSnapshot = await getDoc(templateDoc);
      if (templateSnapshot.exists()) {
        setTemplate({ id: templateSnapshot.id, ...templateSnapshot.data() });
      } else {
        console.error("No such document!");
      }
    };

    fetchTemplate();
  }, [id]);

  if (!template) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{template.title}</h1>
      <p>{template.description}</p>
      <h2 className="text-xl">Questions:</h2>
      {template.questions.map((question, index) => (
        <div key={index}>
          <h3 className="font-semibold">{question.title}</h3>
          <p>{question.description}</p>
        </div>
      ))}
      <Comments templateId={template.id} />
    </div>
  );
};

export default FormDetails;
