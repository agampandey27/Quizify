import React, { useState } from 'react';
import axios from 'axios';
import './StyleAddQues.css'

function AddQuestion() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddQuestion = async () => {
    if (!question.trim() || !answer.trim() || options.some(option => !option.trim())) {
      setMessage(`Sorry for the inconvenience but you can't modify data.json file`);
      return;
    }

    const newQuestion = {
      question: question.trim(),
      options: options.map(option => option.trim()),
      answer: answer.trim(),
    };

    try {
      await axios.post('../../../public/data.json', newQuestion);
      setMessage('Question added successfully!');
    } catch (error) {
      setMessage('Error adding question. Please try again later.');
    }
  };

  return (
    <div className="add-question-container">
      <h2>Add New Question</h2>
      {message && <p className="success-message">{message}</p>}
      <input
        type="text"
        placeholder="Enter question"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        className="input-field"
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Enter option ${index + 1}`}
          value={option}
          onChange={e => handleOptionChange(index, e.target.value)}
          className="input-field"
        />
      ))}
      <input
        type="text"
        placeholder="Enter answer"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        className="input-field"
      />
      <button onClick={handleAddQuestion} className="add-button">Add Question</button>
    </div>
  );
}

export default AddQuestion;