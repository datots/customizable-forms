// HomePage.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/UserContext"; // Import your authentication context

const HomePage = () => {
  const { user } = useAuth(); // Get the current authenticated user
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      const templatesCollection = await getDocs(collection(db, "templates"));
      setTemplates(
        templatesCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setLoading(false);
    };

    fetchTemplates();
  }, []);

  if (loading) return <p>Loading templates...</p>;

  // Redirect users who are not authenticated
  if (!user) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold">
          You need to log in to view this page.
        </h2>
        <Link to="/login" className="text-blue-500 underline">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Available Templates</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.length === 0 ? (
          <p>No templates available.</p>
        ) : (
          templates.map((template) => (
            <div key={template.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{template.title}</h2>
              <p>{template.description}</p>
              <Link
                to={`/templates/${template.id}`}
                className="text-blue-500 underline mt-2 block"
              >
                View Template
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
