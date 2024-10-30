import React, { useState } from "react";

const QuestionManager = ({ questions, setQuestions }) => {
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { type: "single-line", title: "", description: "", displayStatus: true },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <input
            type="text"
            value={question.title}
            onChange={(e) =>
              handleQuestionChange(index, "title", e.target.value)
            }
            placeholder="Question Title"
          />
          {/* Add more fields based on question type */}
        </div>
      ))}
      <button onClick={addQuestion}>Add Question</button>
    </div>
  );
};

export default QuestionManager;
