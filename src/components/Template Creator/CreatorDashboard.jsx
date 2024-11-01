// // src/components/UserDashboard.jsx
// import React, { useState, useEffect } from "react"; // Import useState
// import CreateTemplate from "./CreateTemplate";
// import ManageTemplates from "./ManageTemplates";
// import ViewFilledForms from "./ViewFilledForms";
// import TemplateSettings from "./TemplateSettings";
// import ReorderQuestions from "./ReorderQuestions";
// import SpecifyUserAccess from "./SpecifyUserAccess";
// import ViewAggregatedResults from "./ViewAggregatedResults";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// const CreatorDashboard = () => {
//   const { user } = useAuth();
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if the user role is not template_creator
//     if (user.role !== "template_creator") {
//       // Redirect to login page if the user is not allowed
//       navigate("/");
//     }
//   }, [user, navigate]);
//   const handleLogout = () => {
//     localStorage.removeItem("authToken"); // Clear authentication data
//     window.location.href = "/"; // Redirect to login page
//   };

//   return (
//     <div className="dashboard p-4">
//       <h1 className="text-2xl font-bold">Template Creator Dashboard</h1>
//       {/* <p className="text-sm">Logged in as: {user.email}</p>{" "} */}
//       {/* Display email */}
//       <button onClick={handleLogout} className="btn-logout">
//         Logout
//       </button>
//       <CreateTemplate setSelectedTemplate={setSelectedTemplate} />{" "}
//       {/* Pass down setter */}
//       <ManageTemplates setSelectedTemplate={setSelectedTemplate} />{" "}
//       {/* If applicable */}
//       <ViewFilledForms />
//       <TemplateSettings />
//       {selectedTemplate && ( // Render ReorderQuestions only if selectedTemplate is defined
//         <ReorderQuestions templateId={selectedTemplate.id} />
//       )}
//       <SpecifyUserAccess />
//       <ViewAggregatedResults />
//     </div>
//   );
// };

// export default CreatorDashboard;

import React, { useState, useEffect } from "react";
import CreateTemplate from "./CreateTemplate";
import ManageTemplates from "./ManageTemplates";
import ViewFilledForms from "./ViewFilledForms";
import TemplateSettings from "./TemplateSettings";
import ReorderQuestions from "./ReorderQuestions";
import SpecifyUserAccess from "./SpecifyUserAccess";
import ViewAggregatedResults from "./ViewAggregatedResults";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreatorDashboard = () => {
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user role is not template_creator or user is null
    if (!user || user.role !== "template_creator") {
      // Redirect to login page if the user is not allowed
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear authentication data
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <div className="dashboard p-4">
      <h1 className="text-2xl font-bold">Template Creator Dashboard</h1>
      {user ? (
        <>
          <p className="text-sm">Logged in as: {user.email}</p>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </>
      ) : (
        <p className="text-sm">Loading user information...</p> // Optional loading state
      )}
      <CreateTemplate setSelectedTemplate={setSelectedTemplate} />
      <ManageTemplates setSelectedTemplate={setSelectedTemplate} />
      <ViewFilledForms />
      <TemplateSettings />
      {selectedTemplate && (
        <ReorderQuestions templateId={selectedTemplate.id} />
      )}
      <SpecifyUserAccess />
      <ViewAggregatedResults />
    </div>
  );
};

export default CreatorDashboard;
