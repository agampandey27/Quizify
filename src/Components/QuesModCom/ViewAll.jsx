import React, { useState } from 'react';
import data from '../../../public/data.json';
import './StyleViewAll.css';

function ViewAll() {
  const [questions, setQuestions] = useState(data.questions);
  const [editModes, setEditModes] = useState(new Array(data.questions.length).fill(false));

  const handleOptionChange = (questionIndex, optionIndex, newValue) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = newValue;
    setQuestions(updatedQuestions);
    // You can also update the JSON file here if needed
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
    // You can also update the JSON file here if needed
  };

  const handleEditQuestion = (index) => {
    const updatedEditModes = [...editModes];
    updatedEditModes[index] = !updatedEditModes[index];
    setEditModes(updatedEditModes);
  };

  return (
    <div className="question-container">
      <h2>All Questions</h2>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="question-card">
          {editModes[questionIndex] ? (
            <div>
              <input
                type="text"
                value={question.question}
                onChange={(e) => handleOptionChange(questionIndex, 'question', e.target.value)}
              />
              <ul className="options-list">
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                    />
                  </li>
                ))}
              </ul>
              <input
                type="text"
                value={question.answer}
                onChange={(e) => handleOptionChange(questionIndex, 'answer', e.target.value)}
              />
            </div>
          ) : (
            <div>
              <p><strong>Question:</strong> {question.question}</p>
              <p><strong>Options:</strong></p>
              <ul className="options-list">
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>{option}</li>
                ))}
              </ul>
              <p><strong>Answer:</strong> {question.answer}</p>
            </div>
          )}
          <div>
            <button onClick={() => handleEditQuestion(questionIndex)} className="edit-button">
              {editModes[questionIndex] ? 'Save' : 'Edit'}
            </button>
            <button onClick={() => handleDeleteQuestion(questionIndex)} className="delete-button">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewAll;
