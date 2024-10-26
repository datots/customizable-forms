// UserPage.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth"; // Assuming you have an index.js that exports all hooks

const UserPage = () => {
  const { user } = useAuth();
  const [forms, setForms] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchUserFormsAndTemplates = async () => {
        const formsQuery = query(
          collection(db, "forms"),
          where("userId", "==", user.uid)
        );
        const templatesQuery = query(
          collection(db, "templates"),
          where("userId", "==", user.uid)
        );

        const formsSnapshot = await getDocs(formsQuery);
        const templatesSnapshot = await getDocs(templatesQuery);

        setForms(
          formsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setTemplates(
          templatesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setLoading(false);
      };

      fetchUserFormsAndTemplates();
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
      <section>
        <h2 className="text-xl font-semibold">Your Forms</h2>
        {forms.length === 0 ? (
          <p>No forms available.</p>
        ) : (
          <ul>
            {forms.map((form) => (
              <li key={form.id} className="border-b py-2">
                {form.title}
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h2 className="text-xl font-semibold">Your Templates</h2>
        {templates.length === 0 ? (
          <p>No templates available.</p>
        ) : (
          <ul>
            {templates.map((template) => (
              <li key={template.id} className="border-b py-2">
                {template.title}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default UserPage;
