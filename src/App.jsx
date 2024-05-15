import React, { useState, useEffect } from "react";
import Home from "./Screens/Home";
import { css } from "@emotion/react";
import { PropagateLoader } from "react-spinners";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Quiz from "./Screens/Quiz";
import Result from "./Screens/Result";
import QuestionMod from "./Screens/QuestionMod";
import CreateQues from "./Screens/CreateQues";
import ReadQues from "./Screens/ReadQues";
import TImesUp from "./Screens/TImesUp";

const LoadingScreen = () => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#212121",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <PropagateLoader color={"#36D7B7"} css={override} size={15} />
    </div>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div>
      <Container>
        {loading ? (
          <LoadingScreen />
        ) : (
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/quiz" element={<Quiz />} />
            <Route exact path="/result" element={<Result />} />
            <Route exact path="/ques-mod" element={<QuestionMod />} />
            <Route exact path="/ques-create" element={<CreateQues />} />
            <Route exact path="/ques-read" element={<ReadQues />} />
            <Route exact path="/times-up" element={<TImesUp />} />
          </Routes>
        )}
      </Container>
    </div>
  );
};

export default App;
