import { useState } from "react";
import CreateTemplate from "./CreateTemplate";

const TemplateTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General Settings" },
    { id: "questions", label: "Questions" },
    { id: "results", label: "Results" },
    { id: "create", label: "Create Template" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <div>General Content</div>;
      case "questions":
        return <div>Questions Content</div>;
      case "results":
        return <div>Results Content</div>;
      case "create":
        return <CreateTemplate />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-2 px-4 text-sm font-medium focus:outline-none ${
              activeTab === tab.id
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default TemplateTabs;
