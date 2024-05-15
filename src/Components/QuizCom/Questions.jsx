import React, { useState, useEffect, useRef } from "react";
import quizData from "../../../public/data.json";
import { Box } from "@mui/material";
import "./StyleQuestions.css";
import NextButton from "./NextButton";
import SubmitAnsButton from "./SubmitAns";
import SubmitQuizButton from "./SubmitQuiz";
import { useGlobal } from '../Global/GlobalVariable';

function Questions() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answersSubmitted, setAnswersSubmitted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [questionSpeech, setQuestionSpeech] = useState(""); 
  const [optionsSpeech, setOptionsSpeech] = useState(""); 
  const [showOptions, setShowOptions] = useState(false); 
  const questions = quizData.questions;
  const totalQuestions = questions.length;
  const [correctAns, setCorrectAns] = useState("");
  var { num, setNum } = useGlobal();
  const utteranceRef = useRef(null);

  useEffect(() => {
    
    if (questions[currentQuestionIndex]) {
      const questionSpeech = new SpeechSynthesisUtterance(questions[currentQuestionIndex].question);
      const options = questions[currentQuestionIndex].options.join('. ') + '.';
      setSpeech(questionSpeech, options);
    }
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    if (questionSpeech && optionsSpeech) {
      utteranceRef.current = new SpeechSynthesisUtterance(questionSpeech);
      utteranceRef.current.onend = () => {
        startOptionsSpeech();
      };
    }
  }, [questionSpeech, optionsSpeech]);

  const setSpeech = (questionSpeech, optionsSpeech) => {
    window.speechSynthesis.cancel(); 
    const fullSpeech = new SpeechSynthesisUtterance(`${questionSpeech.text}. ${optionsSpeech}`);
    window.speechSynthesis.speak(fullSpeech); 
    setQuestionSpeech(questionSpeech.text);
    setOptionsSpeech(optionsSpeech);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const submitAnswer = () => {
    if (selectedOption !== null) {
      const isCorrect = checkAns();
      setCorrectAns(
        isCorrect ? selectedOption : questions[currentQuestionIndex].answer
      );
      setAnswersSubmitted(true);
      if (isCorrect) {
        setNum(num = num + 1);
      }
    } else {
      alert("Please select an option.");
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setAnswersSubmitted(false);
      setShowOptions(false);
    } else {
      setQuizSubmitted(true);
    }
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
    stopSpeech(); // Stop speech synthesis when submitting the quiz
  };

  const checkAns = () => {
    return selectedOption === questions[currentQuestionIndex].answer;
  };

  const speakQuestion = () => {
    setShowOptions(false); 
    window.speechSynthesis.cancel(); 
    if (utteranceRef.current) {
      utteranceRef.current.text = questionSpeech; 
      window.speechSynthesis.speak(utteranceRef.current); 
    }
  };

  const startOptionsSpeech = () => {
    const optionsSpeechUtterance = new SpeechSynthesisUtterance(optionsSpeech);
    window.speechSynthesis.speak(optionsSpeechUtterance);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <Box>
      <div className="container">
        <div className="heading">QUIZ</div>
        <div className="count">
          Question {currentQuestionIndex + 1} out of {totalQuestions}
        </div>
        <div>{questionSpeech}</div>
        {showOptions && (
          <div>{optionsSpeech}</div>
        )}
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <li key={index}>
              <button
                style={{
                  fontSize: "1rem",
                  margin: "0.5rem 0",
                  padding: "0.5rem 1rem",
                  backgroundColor:
                    selectedOption === option
                      ? correctAns === option
                        ? "#007f00"
                        : "#ff0000"
                      : correctAns === option
                      ? "#007f00"
                      : selectedOption === option
                      ? "#7CFC00"
                      : "#fff",
                  color: selectedOption === option ? "#fff" : "#000",
                }}
                onClick={() => handleOptionSelect(option)}
                disabled={answersSubmitted || quizSubmitted}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
        {!answersSubmitted && (
          <button
            style={{
              fontSize: "1rem",
              padding: "0.5rem 1rem",
              marginTop: "1rem",
              cursor: selectedOption !== null ? "pointer" : "not-allowed",
            }}
            onClick={submitAnswer}
            disabled={selectedOption === null}
          >
            <SubmitAnsButton />
          </button>
        )}
        {answersSubmitted &&
          !quizSubmitted &&
          (currentQuestionIndex < totalQuestions - 1 ? (
            <button
              style={{
                fontSize: "1rem",
                padding: "0.5rem 1rem",
                marginTop: "1rem",
                cursor: "pointer",
              }}
              onClick={goToNextQuestion}
            >
              <NextButton />
            </button>
          ) : (
            <button
              style={{
                fontSize: "1rem",
                padding: "0.5rem 1rem",
                marginTop: "1rem",
                cursor: "pointer",
              }}
              onClick={submitQuiz}
            >
              <SubmitQuizButton />
            </button>
          ))}
        {quizSubmitted && (
          <button
            style={{
              fontSize: "1rem",
              padding: "0.5rem 1rem",
              marginTop: "1rem",
              cursor: "pointer",
            }}
            onClick={submitQuiz}
          >
            <SubmitQuizButton />
          </button>
        )}
          <button
  style={{
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    marginTop: "1rem",
    cursor: "pointer",
    border: "1px solid black",
    borderRadius: "10px",
    backgroundColor: "#36D7B7",
    color: "black",
    transition: "background-color 0.3s ease",
  }}
  onClick={() => {
    if (!quizSubmitted) {
      speakQuestion();
    }
  }}
  disabled={quizSubmitted}
  className="speaker"
>
  <p style={{ margin: 0 }}>Speak the question</p>
</button>
      </div>
    </Box>
  );
}

export default Questions;