// src/Forms/FilledForm.jsx
import React from "react";

const FilledForm = ({ form }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{form.title}</h1>
      <p>{form.description}</p>
      <h2 className="text-xl">Answers:</h2>
      {form.questions.map((question, index) => (
        <div key={index}>
          <h3 className="font-semibold">{question.title}</h3>
          <p>{question.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FilledForm;
