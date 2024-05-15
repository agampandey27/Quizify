import React, { useState, useEffect } from "react";
import quizData from "../../public/data.json";
import CircularProgress from "@mui/material/CircularProgress";
import "./StyleResult.css";
import PlayAgainButton from "../Components/ResultCom/PlayAgainButton";
import DirectHomeButton from "../Components/ResultCom/DirectHomeButton";
import { useGlobal } from '../Components/Global/GlobalVariable'

function Result() {
  const questions = quizData.questions;
  const totalQuestions = questions.length;
  var { num, setNum } = useGlobal();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const numZero = () =>{
    setNum(num = 0);
  }

  return (
    <div className="result-container">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div className="result-content">
            <h2 className="result-heading">Congratulations!</h2>
            <p className="result-text">
              You got {num} / {totalQuestions} Correct
            </p>
          </div>
          <div className="buttons">
            <button onClick={numZero}><PlayAgainButton /></button>
            <button onClick={numZero}><DirectHomeButton /></button>
          </div>
        </>
      )}
    </div>
  );
}

export default Result;
