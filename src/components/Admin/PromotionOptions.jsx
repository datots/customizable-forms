// src/components/PromotionOptions.jsx
import React from "react";

const PromotionOptions = ({ userId, onPromote }) => {
  const handlePromotion = (role) => {
    onPromote(userId, role);
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => handlePromotion("template_creator")}
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Promote to Template Creator
      </button>
    </div>
  );
};

export default PromotionOptions;
