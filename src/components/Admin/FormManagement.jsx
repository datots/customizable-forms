import React, { useEffect, useState } from "react";
import { db } from "../../services/Firebase";
import { collection, getDocs } from "firebase/firestore";

const FormManagement = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "title",
    direction: "ascending",
  });

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const formCollection = await getDocs(collection(db, "forms"));
        setForms(
          formCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (err) {
        setError("Failed to load forms");
      } finally {
        setLoading(false);
      }
    };
    fetchForms();
  }, []);

  // Sorting function
  const sortedForms = [...forms].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.direction === "ascending" ? "descending" : "ascending",
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Form Management</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr>
              <th
                className="border px-4 py-2 cursor-pointer"
                onClick={() => handleSort("title")}
              >
                Form Title{" "}
                {sortConfig.key === "title" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th
                className="border px-4 py-2 cursor-pointer"
                onClick={() => handleSort("submittedBy")}
              >
                Submitted By{" "}
                {sortConfig.key === "submittedBy" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedForms.length > 0 ? (
              sortedForms.map((form) => (
                <tr key={form.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{form.title}</td>
                  <td className="border px-4 py-2">{form.submittedBy}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-4">
                  No forms available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FormManagement;
