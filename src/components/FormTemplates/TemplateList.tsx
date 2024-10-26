// TemplateList.js
import { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import { collection } from "firebase/firestore";

const TemplateList = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const snapshot = await firestore.collection("templates").get();
      const templatesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTemplates(templatesData);
    };
    fetchTemplates();
  }, []);

  return (
    <div>
      <h1>Available Templates</h1>
      <ul>
        {templates.map((template) => (
          <li key={template.id}>
            <h2>{template.title}</h2>
            <p>Questions: {template.questions.join(", ")}</p>
            <button
              onClick={() => {
                /* Redirect to FillForm component with template id */
              }}
            >
              Fill Out Form
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateList;
